import "./feature-panel.scss"
import { h, FunctionalComponent } from 'preact'
import { Control, Feature } from '../model/part'
import { ControlPanel } from './control-panel'

interface FeaturePanelProps {
	feature: Feature
}

export const FeaturePanel = ( props: FeaturePanelProps ) => {
	const maxControlsPerGroup = 6
	const { name, controlsArray, getConformance } = props.feature
	
	let controls = controlsArray
	const controlGroups: Control[][] = []

	while ( controls.length ) {
		controlGroups.push( controls.slice( 0, maxControlsPerGroup ) )
		controls = controls.slice( maxControlsPerGroup )
	}

	return (
		<div className="feature-panel">
			<h3 className={`header ${ props.feature?.getConformance().toString() }`}>{ name }</h3>
			<div className="container">
				{
					controlGroups.map( controls => (
						<ControlPanelGroup controls={ controls } />
					))
				}
			</div>
		</div>
	)
}

interface ControlPanelGroupProps {
	controls: Control[]
}

const ControlPanelGroup: FunctionalComponent<ControlPanelGroupProps> = ({controls}) => (
	<div className="control-panel-group">
		<div className="control-panel header">
			<span>Control</span><span>Dev</span><span>Dev Out Tot</span>
		</div>
		{
			controls?.map( control => (
				<ControlPanel key={control.name} control={ control} />
			))
		}

	</div>
)