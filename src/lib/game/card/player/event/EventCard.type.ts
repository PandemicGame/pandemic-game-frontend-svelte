import type Color from '$lib/util/Color.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import PlayerCard from '../PlayerCard.type';

@TypeInfo()
export default class EventCard extends PlayerCard {
	constructor(
		public title: string,
		public color: Color,
		public description: string
	) {
		super(title, color);
	}
}
