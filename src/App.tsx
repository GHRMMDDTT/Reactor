import './App.css';
import { View, View$OnPaddingChangedListener } from './mddt/components/design/widgets/view';

/*<CSS>
	<CSSColor>
		<CSSBackgroundColor value={'red'} />
	</CSSColor>
	<CSSPaddingLayout>
		<CSSPadding value={'10px'} />
		<CSSPadding value={'20px'} />
	</CSSPaddingLayout>
	<CSSMarginLayout>
		<CSSMargin value={'50px'} />
	</CSSMarginLayout>
	<CSSAnimation>
		<CSSAnimationRotation>
			<CSSAnimationOnPreapre>
				<To value='180'/>
				<From value='0' />
				<Duration value={'300'} />
			</CSSAnimationOnPreapre>
			<CSSAnimationOnProgress value={(self, animarionInMovement) => {
				if (animarionInMovement.getIs() == '90') {
					animarionInMovement.setRotation('180');
				} // termina como el 270.
			}} />
		</CSSAnimationRotation>
	</CSSAnimation>
</CSS>*/

export default function App() {
	return <View
		width='100px'
		height='100px'
		padding='50px'
		backgroundColor={'red'}
		onPressed={(self) => {
			self.setWidth('200px')
		}}
		onReleased={(self) => {
			self.setWidth(undefined)
		}}
		onPaddingChanged={
			{
				onPaddingChanged: (olded: [string, string, string, string], newes: [string, string, string, string]) => {
					console.log("📦 Padding actualizado:", { old: olded, new: newes });
				}
			}
		} />;
}