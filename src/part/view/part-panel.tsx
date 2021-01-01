import "./part-panel.scss"
import { h } from 'preact'
import { Part } from '../part'
import { FeaturePanel } from './feature-panel'

interface PartPanelProps {
	part: Part
}

export const PartPanel = ( props: PartPanelProps ) => {
	const { name, features } = props.part

	return (
		<div className="part-panel">
			<h2 className="header">{ name }</h2>
			{
				features?.map( feature => (					
					<FeaturePanel key={feature.name} feature={ feature } />
				))
			}
		</div>
	)
}