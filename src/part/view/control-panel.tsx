import "./control-panel.scss"
import { h } from 'preact'
import { Control } from '../model/part';
const OkIcon = require( "@fortawesome/fontawesome-free/svgs/regular/check-circle.svg" );
const NotOkIcon = require( "@fortawesome/fontawesome-free/svgs/regular/times-circle.svg");

interface ControlPanelProps {
	control: Control
}

export const ControlPanel = ( props: ControlPanelProps ) => {
	const { name, dev, maxDev, tolerance } = props.control

	return (
		<div className="control-panel">
			<span className="name">{ name }</span>
			<span>{ dev.toFixed( 3 ) }</span>
			<span>{ maxDev.toFixed( 3 ) }</span>
			<span>
				{ maxDev < tolerance
					? <OkIcon fill="green" width="1em"/>
					: <NotOkIcon fill="red" width="1em"/> 
				}
			</span>
		</div>
	)
}