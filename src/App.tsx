import React from 'react';
import './App.css';
import { MaterialDesignReact, View, Binding } from './mddt/components/design/components-widgets';

function App() {
	let a: View | React.ReactElement<Binding> = <View.React width='100px' height='200px' padding='100px' onPaddingChanget={
		(old: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4, newed: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4) => {
			if (View.getAttributeCastToInt(newed) >= 100) {
				(a as View).setPadding(['50px', '50px']);
			}
			(a as View).setPadding(newed);
		}
	}/>;
	return a;
}

export default App;
