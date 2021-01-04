import { Part, Feature, Control } from '../part/model/part';
import { DataStream } from './data-stream';
import data from "./data.json";

export class MockDataStream extends DataStream {
	connect() {
		this._intervalHdl = setInterval( 
			()=>this._observable.notify( this.createRandomPart() ), 2 * 1000 
		)
		this._observable.notify( this.createRandomPart() )
	}

	disconnect() {
		clearInterval( this._intervalHdl )
	}

	createRandomPart(): Part {
		const features = []
		
		data[0].features.forEach( feature => {
			const controls = []
			
			feature.controls.forEach( control =>{
				const newControl = new Control( control.name )
				newControl.dev = Math.random() ** 2,
				controls.push( newControl )
			})
			
			features.push( new Feature( feature.name, controls ) )
		})
		
		return new Part( data[0].name, features )
	}

	private _intervalHdl: NodeJS.Timeout
}