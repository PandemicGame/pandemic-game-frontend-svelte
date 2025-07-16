<script lang="ts">
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import type Game from '../Game.type';
	import { gameService } from '../GameService';
	import type Board from './Board.type';
	import type Field from './Field.type';

	const { game }: { game: Game } = $props();

	onMount(() => {
		const board = game.board;
		if (board) {
			intializeBoard(board);
		}
	});

	let map: L.Map | undefined;
	const linePaneName = 'linePane';
	const fieldIdToCircleMap = new Map<number, L.Circle>();
	const fieldIdToClickListenerMap = new Map<number, (field: Field) => void>();

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
		const idToFieldMap = gameService.createIdToFieldMap(board.fields ?? []);
		for (const [id, field] of idToFieldMap) {
			if (field.hasCoordinates()) {
				drawField(field);
				drawConnections(field, idToFieldMap);
			}
		}
	}

	function drawField(field: Field) {
		const id = field.id;
		if (map && id) {
			const circle = drawCircle(field);
			fieldIdToCircleMap.set(id, circle);
			circle.on('click', function () {
				const listener = fieldIdToClickListenerMap.get(id);
				if (listener) {
					listener(field);
				}
			});
			drawLabel(field);
		}
	}

	function drawCircle(field: Field): L.Circle {
		const color = game.getPlagueForCode(field.plagueCode ?? '')?.color?.getCssValue();
		return L.circle([field.ycoordinate!, field.xcoordinate!], {
			color: 'black',
			fillColor: color,
			fillOpacity: 1,
			radius: 125000
		}).addTo(map!);
	}

	function drawLabel(field: Field): L.Marker {
		return L.marker([field.ycoordinate! - 1, field.xcoordinate!], {
			icon: L.divIcon({
				className: 'text-black text-center font-bold whitespace-nowrap',
				html: `<div>${field.name}</div>`,
				iconSize: [150, 20],
				iconAnchor: [75, 0]
			}),
			interactive: false
		}).addTo(map!);
	}

	function drawConnections(field: Field, fields: Map<number, Field>) {
		for (const id of field.connectionIds ?? []) {
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
		const fromLatitude = from.ycoordinate!;
		const fromLongitude = from.xcoordinate!;
		let toLatitude = to.ycoordinate!;
		let toLongitude = getTargetLongitude(fromLongitude, to.xcoordinate!);

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

	function createMap(container: HTMLDivElement): L.Map {
		const m = L.map(container, {
			center: [0, 0],
			zoom: 3,
			maxBounds: [
				[-85, -180],
				[85, 180]
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
				maxZoom: 5,
				minZoom: 3
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

	export function highlightField(field: Field) {
		modifyFieldCircleElement(field, (el) => el.classList.add(highlightAnimationCssClass));
	}

	export function unhighlightField(field: Field) {
		modifyFieldCircleElement(field, (el) => el.classList.remove(highlightAnimationCssClass));
	}

	function modifyFieldCircleElement(field: Field, callback: (element: Element) => void) {
		const id = field.id;
		if (id) {
			const circle = fieldIdToCircleMap.get(id);
			if (circle) {
				const element = circle.getElement();
				if (element) {
					callback(element);
				}
			}
		}
	}

	export function unhighlightAllFields() {
		fieldIdToCircleMap.keys().forEach((key) => unhighlightField({ id: key } as Field));
	}

	export function addActionListenerToField(field: Field, listener: (field: Field) => void) {
		const id = field.id;
		if (id) {
			fieldIdToClickListenerMap.set(id, listener);
		}
	}

	export function addActionListenerToFieldAndHighlight(
		field: Field,
		listener: (field: Field) => void
	) {
		addActionListenerToField(field, listener);
		highlightField(field);
	}

	export function removeActionListenerFromField(field: Field) {
		const id = field.id;
		if (id) {
			fieldIdToClickListenerMap.delete(id);
		}
	}

	export function removeActionListenersFromAllFields() {
		fieldIdToClickListenerMap
			.keys()
			.forEach((key) => removeActionListenerFromField({ id: key } as Field));
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
