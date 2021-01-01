import { h, render } from "preact";
import { ControlPanel } from './part/view/control-panel';
import { Control } from './part/part';

export const TestPanel = () => {
	const control: Control = {
		dev: 1, maxDev: 1, tolerance:1, name: 'TestControl'
	}

	return (
		<div>
			<h1>Abb Test Panel</h1>
			<ControlPanel control={ control } />
		</div>
	)
}

render(<TestPanel />, document.getElementsByTagName('abbpanel')[0]);
