export enum Conformity {
	accept='accept', reject='reject', warning='warning'
}


abstract class Component {
	readonly conformityThreshold = 0.75
	readonly rejectThreshold = 0.5
	readonly tolerance = 0.75

	constructor( name: string ) {
		this.name = name
	}

	abstract getConformance(): Conformity

	protected evaluateConformance( components: Component[] ) {
		const numRejected = components.reduce( (accumulator, component) => (
			accumulator + ( component.getConformance() === Conformity.reject? 1 : 0 )
		), 0 )

		const acceptRatio = ( components.length - numRejected ) / components.length

		return acceptRatio > this.conformityThreshold
			? Conformity.accept
			: acceptRatio > this.rejectThreshold? Conformity.warning : Conformity.reject
	}

	readonly name: string
}

export class Control extends Component {
	dev: number
	maxDev: number = 0

	getConformance() {
		return this.maxDev > this.tolerance? Conformity.reject : Conformity.accept
	}
}

export class Feature extends Component {
	constructor( name: string, controls: Control[] ) {
		super( name )
		controls.forEach( control => {
			this.controls[ control.name ] = control
		})
	}

	getConformance() {
		return this.evaluateConformance( Object.values( this.controls ) )
	}
	controls: { [ name: string ]: Control } = {}

	get controlsArray() {
		return Object.values( this.controls )
	}
}


export class Part extends Component {
	constructor( name: string, features?: Feature[] ) {
		super( name )
		features?.forEach( feature => {
			this.features[ feature.name ] = feature
		})
	}

	getConformance() {
		return this.evaluateConformance( Object.values( this.features ) )
	}
	
	features: { [ name: string ]: Feature } = {}
	
	get featuresArray() {
		return Object.values( this.features )
	}
}