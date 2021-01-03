import "./part-panel.scss"
import { h } from 'preact'
import { Part } from '../model/part'
import { FeaturePanel } from './feature-panel'

interface PartPanelProps {
	part: Part
}

export const PartPanel = ( props: PartPanelProps ) => {
	if ( !props.part ) return
	const { name, features } = props.part

	return (
		<div className="part-panel">
			<h2 className="header">{ name }</h2>
			{
				Object.values( features ).map( feature => (					
					<FeaturePanel key={feature.name} feature={ feature } />
				))
			}
		</div>
	)
}