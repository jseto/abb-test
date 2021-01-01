export interface Control {
	name: string
	tolerance: number
	dev: number
	maxDev: number
}

export interface Feature {
	name: string
	controls: Control[]
}


export interface Part {
	name: string
	features: Feature[]
}