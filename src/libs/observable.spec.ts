import { Observable } from './observable'

describe('Observable',()=>{
	let observable: Observable<string>
	let subscriber1: ( s: string )=>void
	let subscriber2: ( s: string )=>void

	beforeEach(()=>{
		observable = new Observable<string>()

		subscriber1 = jest.fn()
		subscriber2 = jest.fn()

		observable.subscribe( subscriber1 )
		observable.subscribe( subscriber2 )
	})

	it( 'should notify all subscribers', ()=>{
		observable.notify('You have been notified')

		expect( subscriber1 ).toHaveBeenCalledWith( 'You have been notified' )
		expect( subscriber1 ).toHaveBeenCalledTimes( 1 )

		expect( subscriber2 ).toHaveBeenCalledWith( 'You have been notified' )
		expect( subscriber2 ).toHaveBeenCalledTimes( 1 )
	})

	it( 'should NOT notify removed subscribers', ()=>{
		observable.unsubscribe( subscriber1 )
		observable.notify('You have been notified')

		expect( subscriber1 ).not.toHaveBeenCalled()

		expect( subscriber2 ).toHaveBeenCalledWith( 'You have been notified' )
		expect( subscriber2 ).toHaveBeenCalledTimes( 1 )
	})
})