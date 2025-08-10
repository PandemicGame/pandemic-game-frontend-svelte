import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import MoveAction from '../simple/MoveAction.type';
import ActionEffect from './ActionEffect.type';

@TypeInfo()
export default class MoveActionEffect extends ActionEffect {
	constructor(
		public id: number,
		public movedPlayer: number,
		public toField: number,
		public moveAction: MoveAction | undefined
	) {
		super(id);
	}
}
