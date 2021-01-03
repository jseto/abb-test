import "./feature-panel.scss"
import { h } from 'preact'
import { Feature } from '../model/part'
import { ControlPanel } from './control-panel'

interface FeaturePanelProps {
	feature: Feature
}

export const FeaturePanel = ( props: FeaturePanelProps ) => {
	const { name, controls,  } = props.feature

	return (
		<div className="feature-panel">
			<h3 className={`header`}>{ name }</h3>
			{
				Object.values( controls ).map( control => (
					<ControlPanel key={control.name} control={ control} />
				))
			}
		</div>
	)
}