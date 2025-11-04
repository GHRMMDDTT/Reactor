import React from 'react';
import './App.css';
import { View } from './mddt/components/design/components/view';
import { CSSSizeMath$1, CSSSizeNumeric$1, CSSSizeNumeric$2, CSSSizeNumeric$4 } from './mddt/components/design/css-types';

function App() {
	return <View.React width='100px' height='200px' backgroundColor={['100%', '100%', '0%']} onPaddingChanged={(olded: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4, newed: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4, view: View) => {
		view.setBackgroundColor
	}} />;
}

export default App;
