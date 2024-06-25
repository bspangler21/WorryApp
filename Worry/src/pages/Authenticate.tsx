import {
	ITheme,
	PrimaryButton,
	Stack,
	TextField,
	ThemeProvider,
	createTheme,
	mergeStyleSets,
} from "@fluentui/react";
import { fluentPalette } from "../util/fluentPalette";

const fluentTheme: ITheme = createTheme({ palette: fluentPalette });

const classNames = mergeStyleSets({
	text: {
		width: "500px",
	},
	section: {
		marginBottom: "20px",
		paddingLeft: "20px",
	},
});

export const Authenticate = () => {
	return (
		<ThemeProvider theme={fluentTheme}>
			<div className={classNames.section}>
				<Stack>
					<TextField
						label="Username"
						required
						className={classNames.text}
					></TextField>
					<TextField
						label="Password"
						required
						type="password"
						canRevealPassword
						revealPasswordAriaLabel="Show password"
						className={classNames.text}
					></TextField>
				</Stack>
			</div>
			<div className={classNames.section}>
				<PrimaryButton text="Login" />
			</div>
		</ThemeProvider>
	);
};
