import { h, render } from "preact";
import { Part } from './part/part';
import { PartPanel } from './part/view/part-panel';

export const TestPanel = () => {
	const part: Part = {
		name: 'Backdoor',
		features: [
			{
				name: 'Seam',
				controls: [
					{	name: 'TestControl', dev: 1, maxDev: 1, tolerance:1 }
				]
			}
		]
	}
	
	return (
		<div>
			<h1>Abb Test Panel</h1>
			<PartPanel part={ part } />
		</div>
	)
}

render(<TestPanel />, document.getElementsByTagName('abbpanel')[0]);
