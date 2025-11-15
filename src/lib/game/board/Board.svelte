<script lang="ts">
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import type Game from '../Game.type';
	import { gameService } from '../GameService';
	import type Player from '../player/Player.type';
	import type Board from './Board.type';
	import type Field from './Field.type';

	const { game }: { game: Game } = $props();

	onMount(() => {
		const board = game.board;
		intializeBoard(board);

		$effect(() => drawPlayers(game.playersInTurnOrder));
	});

	let map: L.Map | undefined;
	const linePaneName = 'linePane';
	const fieldIdToCircleMap = new Map<number, L.Circle>();
	const fieldIdToClickListenerMap = new Map<number, (event: MouseEvent, field: Field) => void>();
	const fieldIdToNumberOfPlayersMap = new Map<number, number>();
	const playerIdToClickListenerMap = new Map<
		number,
		(event: MouseEvent, player: Player) => void
	>();
	const playerMarkers: L.Marker[] = [];
	const boardSettings = game.board.settings;

	function intializeBoard(board: Board) {
		createLinePane();
		drawBoard(board);
	}

	function createLinePane() {
		if (map) {
			map.createPane(linePaneName).style.zIndex = '399';
		}
	}

	function drawBoard(board: Board) {
		fieldIdToCircleMap.clear();
		const idToFieldMap = gameService.createIdToFieldMap(board.fields);
		for (const [id, field] of idToFieldMap) {
			drawField(field);
			drawConnections(field, idToFieldMap);
		}
	}

	function drawField(field: Field) {
		const id = field.id;
		if (map) {
			const circle = drawCircle(field, map);
			fieldIdToCircleMap.set(id, circle);
			circle.on('click', function (e) {
				const listener = fieldIdToClickListenerMap.get(id);
				if (listener) {
					listener(e.originalEvent, field);
				}
			});
			drawLabel(field, map);
		}
	}

	function drawCircle(field: Field, m: L.Map): L.Circle {
		const color = game.findPlagueForCode(field.plagueCode)?.color.getCssValue();
		return L.circle([field.ycoordinate, field.xcoordinate], {
			color: 'black',
			fillColor: color,
			fillOpacity: 1,
			radius: boardSettings.boardSlotRadius
		}).addTo(m);
	}

	function drawLabel(field: Field, m: L.Map): L.Marker {
		return L.marker(
			[field.ycoordinate - boardSettings.boardSlotLabelOffset, field.xcoordinate],
			{
				icon: L.divIcon({
					className: 'text-black text-center font-bold whitespace-nowrap',
					html: `<div>${field.name}</div>`,
					iconSize: [150, 20],
					iconAnchor: [75, 0]
				}),
				interactive: false
			}
		).addTo(m);
	}

	function drawConnections(field: Field, fields: Map<number, Field>) {
		for (const id of field.connectionIds) {
			const connectedField = fields.get(id);
			if (connectedField) {
				drawConnection(field, connectedField);
			}
		}
	}

	function drawConnection(from: Field, to: Field): L.Polyline | undefined {
		if (map) {
			return L.polyline(determineLatLng(from, to), {
				color: 'rgb(128, 128, 128)',
				pane: linePaneName
			}).addTo(map);
		}
	}

	function determineLatLng(from: Field, to: Field): L.LatLngExpression[] {
		const fromLatitude = from.ycoordinate;
		const fromLongitude = from.xcoordinate;
		let toLatitude = to.ycoordinate;
		let toLongitude = getTargetLongitude(fromLongitude, to.xcoordinate);

		if (Math.abs(toLongitude) > 180) {
			const newLongitude = toLongitude < 0 ? -180 : 180;
			toLatitude = getTargetLatitudeAtInternationalDateLine(
				fromLatitude,
				fromLongitude,
				toLatitude,
				toLongitude,
				newLongitude
			);
			toLongitude = newLongitude;
		}

		return [
			[fromLatitude, fromLongitude],
			[toLatitude, toLongitude]
		];
	}

	function getTargetLongitude(fromLng: number, toLng: number): number {
		const movedLeft = toLng - 360;
		const movedRight = toLng + 360;

		const defaultDifference = Math.abs(toLng - fromLng);
		const movedLeftDifference = Math.abs(movedLeft - fromLng);
		const movedRightDifference = Math.abs(movedRight - fromLng);

		if (movedLeftDifference < defaultDifference && movedLeftDifference < movedRightDifference) {
			return movedLeft;
		} else if (movedRightDifference < defaultDifference) {
			return movedRight;
		} else {
			return toLng;
		}
	}

	function getTargetLatitudeAtInternationalDateLine(
		fromLatitude: number,
		fromLongitude: number,
		toLatitude: number,
		toLongitudeOriginal: number,
		toLongitudeNewAtIDL: number
	): number {
		const rateOfIncrease = (toLatitude - fromLatitude) / (toLongitudeOriginal - fromLongitude);
		return fromLatitude + rateOfIncrease * (toLongitudeOriginal - toLongitudeNewAtIDL);
	}

	const playerIconSize = 20;

	function drawPlayers(players: Player[]) {
		if (!map) {
			return;
		}

		removePlayerMarkers(map);

		fieldIdToNumberOfPlayersMap.clear();

		const m = map;

		fetch('/images/player.svg')
			.then((response) => response.text())
			.then((svgText) => {
				for (const player of players) {
					const marker = drawPlayer(player, svgText, m);
					if (marker) {
						playerMarkers.push(marker);
					}
				}
			});
	}

	function removePlayerMarkers(m: L.Map) {
		playerMarkers.forEach((marker) => m.removeLayer(marker));
		playerMarkers.splice(0, playerMarkers.length);
	}

	function drawPlayer(player: Player, iconHtml: string, m: L.Map): L.Marker | undefined {
		const fieldId = player.currentField;

		const circle = fieldIdToCircleMap.get(fieldId);
		if (!circle) {
			return;
		}

		const offset = determinePlayerOffset(fieldId);

		const color = player.role.color.getCssValue();

		const marker = L.marker(circle.getLatLng(), {
			icon: L.divIcon({
				html: `<div style="color: ${color};">${iconHtml}</div>`,
				className: '',
				iconSize: [playerIconSize, playerIconSize],
				iconAnchor: [playerIconSize / 2 + offset, playerIconSize]
			})
		}).addTo(m);

		marker.on('click', function (e) {
			const listener = playerIdToClickListenerMap.get(player.id);
			if (listener) {
				listener(e.originalEvent, player);
			}
		});

		return marker;
	}

	function determinePlayerOffset(fieldId: number): number {
		const numberOfPlayersOnField = fieldIdToNumberOfPlayersMap.get(fieldId);
		if (numberOfPlayersOnField) {
			fieldIdToNumberOfPlayersMap.set(fieldId, numberOfPlayersOnField + 1);

			const isEvenNumberedAdditionalPlayer = numberOfPlayersOnField % 2 == 0;

			const numberForPlayerOnSide = Math.ceil(numberOfPlayersOnField / 2);

			const factor = isEvenNumberedAdditionalPlayer ? 1 : -1;

			const defaultOffset = playerIconSize * 0.75;

			return factor * numberForPlayerOnSide * defaultOffset;
		} else {
			fieldIdToNumberOfPlayersMap.set(fieldId, 1);
			return 0;
		}
	}

	function createMap(container: HTMLDivElement): L.Map {
		const m = L.map(container, {
			center: [boardSettings.centerY, boardSettings.centerX],
			zoom: boardSettings.defaultZoom,
			maxBounds: [
				[boardSettings.boundsYMin, boardSettings.boundsXMin],
				[boardSettings.boundsYMax, boardSettings.boundsXMax]
			],
			maxBoundsViscosity: 1.0
		});

		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
			{
				attribution: `
					&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors,
					&copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>
				`,
				noWrap: true,
				maxZoom: boardSettings.maxZoom,
				minZoom: boardSettings.minZoom
			}
		).addTo(m);

		return m;
	}

	function mapAction(container: HTMLDivElement) {
		map = createMap(container);
		return {
			destroy: () => {
				map?.remove();
			}
		};
	}

	const highlightAnimationCssClass = 'animate-blink';

	export function highlightField(fieldId: number) {
		modifyFieldCircleElement(fieldId, (el) => el.classList.add(highlightAnimationCssClass));
	}

	export function unhighlightField(fieldId: number) {
		modifyFieldCircleElement(fieldId, (el) => el.classList.remove(highlightAnimationCssClass));
	}

	function modifyFieldCircleElement(fieldId: number, callback: (element: Element) => void) {
		const circle = fieldIdToCircleMap.get(fieldId);
		if (circle) {
			const element = circle.getElement();
			if (element) {
				callback(element);
			}
		}
	}

	export function unhighlightAllFields() {
		fieldIdToCircleMap.keys().forEach((key) => unhighlightField(key));
	}

	export function addActionListenerToField(
		fieldId: number,
		listener: (event: MouseEvent, field: Field) => void
	) {
		fieldIdToClickListenerMap.set(fieldId, listener);
	}

	export function addActionListenerToFieldAndHighlight(
		fieldId: number,
		listener: (event: MouseEvent, field: Field) => void
	) {
		addActionListenerToField(fieldId, listener);
		highlightField(fieldId);
	}

	export function removeActionListenerFromField(fieldId: number) {
		fieldIdToClickListenerMap.delete(fieldId);
	}

	export function removeActionListenersFromAllFields() {
		fieldIdToClickListenerMap.keys().forEach((key) => removeActionListenerFromField(key));
	}

	export function addActionListenerToPlayer(
		playerId: number,
		listener: (event: MouseEvent, player: Player) => void
	) {
		playerIdToClickListenerMap.set(playerId, listener);
	}

	export function removeActionListenerFromPlayer(playerId: number) {
		playerIdToClickListenerMap.delete(playerId);
	}

	export function removeActionListenersFromAllPlayers() {
		playerIdToClickListenerMap.keys().forEach((key) => removeActionListenerFromPlayer(key));
	}
</script>

<div class="h-full w-full" use:mapAction></div>

<style>
	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	:global(.animate-blink) {
		animation: blink 2s linear infinite;
	}
</style>
