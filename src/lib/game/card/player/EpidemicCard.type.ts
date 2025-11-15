import type Color from '$lib/util/Color.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import PlayerCard from './PlayerCard.type';

@TypeInfo()
export default class EpidemicCard extends PlayerCard {
	constructor(
		public title: string,
		public color: Color
	) {
		super(title, color);
	}
}
