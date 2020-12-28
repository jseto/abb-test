type Callback<T> = ( event: T )=>void

export class Observable<T> {
	subscribe( callback: Callback<T> ){
		this._callbackCollection.push( callback )
	}

	notify( event: T ) {
		this._callbackCollection.forEach( callback =>{
			callback( event )
		})
	}

	unsubscribe( callback: Callback<T> ) {
		this._callbackCollection = this._callbackCollection.filter( cb => cb !== callback )
	}

	private _callbackCollection: Callback<T>[] = []
}