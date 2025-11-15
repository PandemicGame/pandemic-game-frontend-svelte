import type Board from '$lib/game/board/Board.svelte';
import { gameService } from '$lib/game/GameService';
import type ContextMenu from '$lib/util/ContextMenu.svelte';
import type Action from '../Action.type';
import type MoveActionEffect from '../effects/MoveActionEffect.type';
import MoveAction from '../simple/MoveAction.type';

export default function handleMoveActions(
	availableActions: Action[],
	boardComponent: Board,
	contextMenuComponent: ContextMenu
) {
	const movesByPlayers = createPlayerIdsToFieldIdsAndMovesRecord(availableActions);
	allowExecutionOfMoveActionEffects(movesByPlayers, boardComponent, contextMenuComponent);
}

function createPlayerIdsToFieldIdsAndMovesRecord(
	availableActions: Action[]
): Record<number, Record<number, MoveActionEffect[]>> {
	const moveActions = availableActions.filter((action) => action instanceof MoveAction);
	const moveActionEffects = addTriggeringActionToEveryActionEffect(moveActions);
	return reduceMoveActionEffectsToPlayerIdsWithFieldIdsAndMoves(moveActionEffects);
}

function addTriggeringActionToEveryActionEffect(moveActions: MoveAction[]): MoveActionEffect[] {
	return moveActions.flatMap((action) => addActionToEveryActionEffect(action));
}

function addActionToEveryActionEffect(action: MoveAction): MoveActionEffect[] {
	return action.availableEffects.map((effect) => {
		effect.moveAction = action;
		return effect;
	});
}

function reduceMoveActionEffectsToPlayerIdsWithFieldIdsAndMoves(
	moveActionEffects: MoveActionEffect[]
): Record<number, Record<number, MoveActionEffect[]>> {
	return moveActionEffects.reduce(addMoveActionEffect, {});
}

function addMoveActionEffect(
	acc: Record<number, Record<number, MoveActionEffect[]>>,
	moveActionEffect: MoveActionEffect
) {
	const playerId = moveActionEffect.movedPlayer;
	if (!acc[playerId]) {
		acc[playerId] = {};
	}

	const targetFieldId = moveActionEffect.toField;
	if (!acc[playerId][targetFieldId]) {
		acc[playerId][targetFieldId] = [];
	}
	acc[playerId][targetFieldId].push(moveActionEffect);

	return acc;
}

function allowExecutionOfMoveActionEffects(
	playerIdsToFieldIdsAndMovesRecord: Record<number, Record<number, MoveActionEffect[]>>,
	boardComponent: Board,
	contextMenuComponent: ContextMenu
) {
	for (const [playerId, fieldIdsAndMoves] of Object.entries(playerIdsToFieldIdsAndMovesRecord)) {
		allowExecutionOfMoveActionEffectsForPlayer(
			Number(playerId),
			fieldIdsAndMoves,
			boardComponent,
			contextMenuComponent
		);
	}
}

function allowExecutionOfMoveActionEffectsForPlayer(
	playerId: number,
	fieldIdsAndMoves: Record<number, MoveActionEffect[]>,
	boardComponent: Board,
	contextMenuComponent: ContextMenu
) {
	boardComponent.addActionListenerToPlayer(playerId, () => {
		for (const [fieldId, movesToField] of Object.entries(fieldIdsAndMoves)) {
			allowExecutionOfMoveActionEffectsForPlayerToField(
				Number(fieldId),
				movesToField,
				boardComponent,
				contextMenuComponent
			);
		}
	});
}

function allowExecutionOfMoveActionEffectsForPlayerToField(
	fieldId: number,
	movesToField: MoveActionEffect[],
	boardComponent: Board,
	contextMenuComponent: ContextMenu
) {
	const executeMoveActionEffect = (m: MoveActionEffect) => {
		gameService.executeActionEffect(m);
		boardComponent.removeActionListenersFromAllPlayers();
		boardComponent.unhighlightAllFields();
		boardComponent.removeActionListenersFromAllFields();
	};

	const callback = createFieldClickCallback(
		movesToField,
		executeMoveActionEffect,
		contextMenuComponent
	);

	boardComponent.addActionListenerToFieldAndHighlight(fieldId, (e) => callback(e));
}

function createFieldClickCallback(
	movesToField: MoveActionEffect[],
	executeMoveActionEffect: (m: MoveActionEffect) => void,
	contextMenuComponent: ContextMenu
): (e: MouseEvent) => void {
	if (movesToField.length === 0) {
		return () => {};
	} else if (movesToField.length === 1) {
		return () => executeMoveActionEffect(movesToField[0]);
	} else {
		return (e) =>
			openContextMenuWithMoveActionsOnField(
				e,
				movesToField,
				executeMoveActionEffect,
				contextMenuComponent
			);
	}
}

function openContextMenuWithMoveActionsOnField(
	e: MouseEvent,
	movesToField: MoveActionEffect[],
	executeMoveActionEffect: (m: MoveActionEffect) => void,
	contextMenuComponent: ContextMenu
): void {
	const menuItems = movesToField.map((effect) => ({
		text: effect.moveAction?.['@class'] ?? '',
		clickListener: () => {
			executeMoveActionEffect(effect);
			contextMenuComponent.hideMenu();
		}
	}));
	contextMenuComponent.createMenuItems(menuItems);
	contextMenuComponent.openMenu(e);
}
