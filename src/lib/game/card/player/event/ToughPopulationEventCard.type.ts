import type Color from '$lib/util/Color.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import EventCard from './EventCard.type';

@TypeInfo()
export default class ToughPopulationEventCard extends EventCard {
	constructor(
		public title: string,
		public color: Color,
		public description: string
	) {
		super(title, color, description);
	}
}
