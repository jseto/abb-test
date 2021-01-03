import { Conformity, Control, Feature } from './part'

describe('Parts', ()=>{
	describe('Conformance', ()=>{
		it( 'should calculate conformace of control', ()=>{
			const control = new Control( 'test' )

			control.maxDev = 0.1
			expect( control.getConformance() ).toBe( Conformity.accept )

			control.maxDev = 0.751
			expect( control.getConformance() ).toBe( Conformity.reject )
		})

		it( 'should calculate conformace of feature', ()=>{
			const control1 = new Control( 'test1' )
			const control2 = new Control( 'test2' )
			const control3 = new Control( 'test3' )

			const feature = new Feature( 'test', [ control1, control2, control3 ] )

			control1.maxDev = 0.1
			control2.maxDev = 0.1
			control3.maxDev = 0.1
			expect( feature.getConformance() ).toBe( Conformity.accept )

			control1.maxDev = 0.9
			control2.maxDev = 0.1
			control3.maxDev = 0.1
			expect( feature.getConformance() ).toBe( Conformity.warning )

			control1.maxDev = 0.9
			control2.maxDev = 0.8
			control3.maxDev = 0.1
			expect( feature.getConformance() ).toBe( Conformity.reject )
		})
	})
})