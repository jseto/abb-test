import { h, render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { MockDataStream } from './data-stream/mock-data-stream';
import { Part } from './part/model/part';
import { PartController } from './part/controller/part-controller';
import { PartPanel } from './part/view/part-panel';

PartController.registerDataStream( ()=> new MockDataStream() )

export const TestPanel = () => {
	const [ part, setPart ] = useState( new Part( 'Waiting for new part...' ) )

	useEffect(()=>{
		PartController.instance.onNewPart( part => {
			setPart( part )
		})
		PartController.instance.connectToDatastream()
	},[])
	
	return (
		<div>
			<h1>Abb Test Panel</h1>
			<PartPanel part={ part } />
		</div>
	)
}

render(<TestPanel />, document.getElementsByTagName('abbpanel')[0]);
