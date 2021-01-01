export interface Control {
	name: string
	tolerance: number
	dev: number
	maxDev: number
}

export class Feature {
	name: string
	controls: Control[]
}


export class Part {
	name: string
	features: Feature[]
}