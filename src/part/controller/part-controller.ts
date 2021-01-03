import { DataStream, DataStreamFactory, ReceivedPartCallback } from '../../data-stream/data-stream';
import { Observable } from '../../libs/observable';
import { Part } from '../model/part';

export class PartController {
	private constructor( datastreamFactory: DataStreamFactory ) {
		if ( !datastreamFactory ) {
			throw new Error('You should register a data stream factory before using PartController')
		}

		this._processedParts = 0
		this._datastream = datastreamFactory()
		this._onNewPart = new Observable<Part>()
		this._datastream.subscribe( part => this.newPartArrived( part ) )
		this._datastream.connect()
	}

	static get instance() {
		return this._instance || ( this._instance = new this( this._datastreamFactory ) )
	}

	static registerDataStream( datastreamFactory: DataStreamFactory ) {
		if ( datastreamFactory !== this._datastreamFactory ) {
			this._datastreamFactory = datastreamFactory
			this._instance = null
		}
	}

	onNewPart( listener: ReceivedPartCallback ) {
		this._onNewPart.subscribe( listener )
	}

	private newPartArrived( part: Part ) {
		if ( !this._lastPart ) this._lastPart = new Part( part.name, [] )
		this._processedParts++

		this._lastPart = this.updateMaxDev( part )

		this._onNewPart.notify( this._lastPart )
	}

	private updateMaxDev( part: Part ) {
		const lastPartFeatures = this._lastPart.features

		Object.entries( part.features ).forEach( ([ featureName, feature ]) => {
			Object.entries( feature.controls ).forEach( ([ controlName, control ]) => {
				
				const lastMaxDev = lastPartFeatures[ featureName ]?.controls[ controlName ].maxDev || 0
				part.features[ featureName ].controls[ controlName ].maxDev = Math.max( lastMaxDev, control.dev )

			})
		})

		return part
	}

	get part() {
		return this._lastPart
	}

	get processedParts() {
		return this._processedParts
	}

	private _lastPart: Part
	private _processedParts: number
	private _onNewPart: Observable<Part>
	private static _instance: PartController
	private static _datastreamFactory: DataStreamFactory
	private _datastream: DataStream
}