import { MockDataStream } from '../../data-stream/mock-data-stream'
import { PartController } from './part-controller'

jest.useFakeTimers()

describe('Part Controller', ()=>{

	it( 'should throw if datastream not set', ()=>{
		expect(
			()=> PartController.instance
		).toThrow()
	})

	describe('with mock datastream',()=>{
		let oldRandom: () => number

		beforeEach(()=>{
			oldRandom = Math.random
			jest.spyOn( Math, 'random' ).mockImplementation(()=>0.5 )
			PartController.registerDataStream( ()=> new MockDataStream() )
			PartController.instance.connectToDatastream()
		})

		afterEach(()=>{
			Math.random = oldRandom 
		})

		it( 'should notify new part arrived', ()=>{
			const cb = jest.fn()
			PartController.instance.onNewPart( cb )
			jest.advanceTimersToNextTimer()

			expect( cb ).toHaveBeenCalledTimes( 1 )
			expect( cb ).toHaveBeenCalledWith( expect.objectContaining({ name: 'Backdoor' }) )
		})

		it( 'should update total dev on part received', ()=>{
			jest.advanceTimersToNextTimer( 2 )

			expect( PartController.instance.processedParts ).toBe( 3 )
			expect( PartController.instance.part.features['Seam'].controls['Length'].maxDev ).toBe( 0.25 )
		})

	})
})