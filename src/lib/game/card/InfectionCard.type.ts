import type Color from '$lib/util/Color.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import Card from './Card.type';

@TypeInfo()
export default class InfectionCard extends Card {
	constructor(
		public title: string,
		public color: Color
	) {
		super(title, color);
	}
}
