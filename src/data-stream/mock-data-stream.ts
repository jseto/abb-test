import { Part } from '../part/part';
import { DataStream } from './data-stream';

export class MockDataStream extends DataStream {
	connect() {
		this._intervalHdl = setInterval( 
			()=>this._observable.notify( this.createRandomPart() ), 10 * 1000 
		)
	}

	disconnect() {
		clearInterval( this._intervalHdl )
	}

	createRandomPart(): Part {
		return new Part()
	}

	private _intervalHdl: NodeJS.Timeout
}