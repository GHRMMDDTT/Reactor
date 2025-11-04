import React from "react";
import { CSSColor, CSSSizeNumeric$1, CSSSizeNumeric$2, CSSSizeNumeric$4 } from "./css-types";

export interface Binding {}

export interface MaterialDesignReact extends React.ReactElement<Binding> { }

export class View implements MaterialDesignReact {
	readonly props: ViewBinding;

	type: string | React.JSXElementConstructor<any> = "view";
	key: string | null = null;

	constructor(binding: ViewBinding) {
		this.props = binding;
	}

	protected getColorAttribute(color: any): string | undefined {
		function getColorType(color: any): "hexadecimal" | "hsl" | "rgb" | "named" | "unknown" | "advanced" | "hwb" {
			if (typeof color === "string") {
				// Named color o función avanzada
				if (/^(black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|orange|aliceblue|rebeccapurple|transparent|currentColor|inherit|initial|unset)$/i.test(color)) {
					return "named";
				}
				if (/^color\(/i.test(color) || /\.(lab|lch|oklab|oklch|display-p3|srgb)$/.test(color)) {
					return "advanced";
				}
			}

			if (Array.isArray(color)) {
				if (
					color.length >= 3 &&
					color.every((v: string) => /^[0-9A-F]{2}$/i.test(v))
				) {
					return "hexadecimal";
				}

				if (
					(
						color.length === 4 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%") &&
						/^((0.\d+|1.0)|\d{1,3}%)$/.test(color[3])
					) || (
						color.length === 3 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%")
					)
				) {
					return "hsl";
				}
				
				if (
					color.length >= 3 &&
					((
						/^\d{1,3}%$/.test(color[0]) &&
						/^\d{1,3}%$/.test(color[1]) &&
						/^\d{1,3}%$/.test(color[2])
					) || (
						/^\d{1,3}$/.test(color[0]) &&
						/^\d{1,3}$/.test(color[1]) &&
						/^\d{1,3}$/.test(color[2])
					)) &&
					/^((0.\d+|1.0)|\d+(\.\d+)?%|\d{1,3})$/.test(color[3])
				) {
					return "rgb";
				}

				if (
					(
						color.length === 5 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%") &&
						/^((0.\d+|1.0)|\d+(\.\d+)?%)$/.test(color[3]) &&
						color[4] === "hwb"
					) || (
						color.length === 4 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%") &&
						color[3] === "hwb"
					)
				) {
					return "hwb";
				}
			}

			return "unknown";
		}

		const type = getColorType(color);

		switch (type) {
			case "named": {
				return color;
			}

			case "hexadecimal": {
				return "#" + color.join("");
			}

			case "rgb": {
				if (color.length === 3)
					return `rgb(${color.join(", ")})`;
				if (color.length === 4)
					return `rgba(${color.join(", ")})`;
				break;
			}

			case "hsl": {
				if (color.length === 3)
					return `hsl(${color.join(", ")})`;
				if (color.length === 4)
					return `hsla(${color.join(", ")})`;
				break;
			}

			case "hwb": {
				if (color.length === 4)
					return `hwb(${color.slice(0, 3).join(" ")})`;
				if (color.length === 5)
					return `hwb(${color.slice(0, 3).join(" ")} / ${color[3]})`;
				break;
			}

			case "advanced": {
				if (/^color\(/i.test(color)) return color;
				if (/\.(lab|lch|oklab|oklch|display-p3|srgb)$/i.test(color)) {
					const name = color.match(/\.(\w+)$/)?.[1];
					if (name) return `color(${name} ${color.replace(/\.\w+$/, "")})`;
				}
				return color;
			}

			case "unknown":
			default: {
				return undefined;
			}
		}
	}

	protected getPaddingAttribute() { }

	public setPadding(padding: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4): void {

	}

	public getAttribute(): React.CSSProperties {
		const b = this.props as ViewBinding;
		
		

		let mapped: React.CSSProperties = {
			// --- Size ---
			width: b.height,
			height: b.width,

			backgroundColor: this.getColorAttribute(b.backgroundColor),
			color: this.getColorAttribute(b.foregoundColor)
		};

		return mapped;
	}

	static React(binding: ViewBinding): View {
		return new View(binding);
	};
}

interface ViewBinding extends Binding {
	// --- Size ---
	width: CSSSizeNumeric$1;
	height: CSSSizeNumeric$1;

	// --- Padding ---
	padding?: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4;

	// --- Id ---
	name?: string;

	// --- color ---
	backgroundColor?: CSSColor,
	foregoundColor?: CSSColor,
}