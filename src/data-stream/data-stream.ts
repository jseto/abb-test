import { Observable } from '../libs/observable';
import { Part } from '../part/part';

type ReceivedPartCallback = ( part: Part )=>void

export abstract class DataStream {
	/**
	 * The connect method gives you the opportunity to stablish a physical connection
	 * with the concrete data source stream and start to receive data
	 */
	abstract connect(): void | Promise<void>
	abstract disconnect(): void | Promise<void>

	constructor() {
		this._observable = new Observable<Part>()
	}

	subscribe( callback: ReceivedPartCallback ) {
		this._observable.subscribe( callback )
	}

	protected _observable: Observable<Part>
}