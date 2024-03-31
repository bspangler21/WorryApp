import {
	DatePicker,
	DefaultButton,
	ITheme,
	TextField,
	ThemeProvider,
	createTheme,
	mergeStyleSets,
} from "@fluentui/react";
import { Worry } from "../../types/Worry";
import { useState } from "react";
import { fluentPalette } from "../../util/fluentPalette";

const fluentTheme: ITheme = createTheme({ palette: fluentPalette });

const classNames = mergeStyleSets({
	wrapper: {
		height: "100vh",
		// display: "block",
		// alignItems: "center",
		// justifyContent: "center",
		padding: "20px",
	},
	mainContentWrapper: {
		alignItems: "center",
	},
	regularTextField: {
		width: "500px",
		paddingBottom: "20px",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
	largeTextField: {
		width: "500px",
		// maxHeight: "150px",
		paddingBottom: "20px",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
		// overflowY: "scroll",
	},
	dateField: {
		width: "500px",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
	submitButton: {
		width: "500px",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
});

type Args = {
	worry: Worry;
	submitted: (worry: Worry) => void;
	isEdit: boolean;
};

const DateForm = ({ worry, submitted, isEdit }: Args) => {
	const [worryState, setWorryState] = useState({ ...worry });

	const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
		console.log("worryState", worryState);
		e.preventDefault();
		submitted(worryState);
	};

	return (
		<ThemeProvider theme={fluentTheme}>
			<div
				className={classNames.wrapper}
				// style={{ display: "flex", justifyContent: "center", width: "100vw"}}
			>
				<div>
					<TextField
						label="Title"
						// placeholder="Worry title"
						required
						value={isEdit ? worry.title : worryState.title}
						onChange={(event, newValue) => {
							setWorryState({
								...worryState,
								title: newValue ?? "",
							});
						}}
						className={classNames.regularTextField}
					></TextField>
					<TextField
						label="Description"
						value={
							isEdit ? worry.description : worryState.description
						}
						multiline
            rows={4}
						onChange={(event, newValue) => {
							setWorryState({
								...worryState,
								description: newValue ?? "",
							});
						}}
						className={classNames.largeTextField}
					></TextField>
					<DatePicker
						label="Date Recorded"
						placeholder="Select a date..."
						isRequired={true}
						value={
							isEdit
								? new Date(worry.dateRecorded)
								: new Date(worryState.dateRecorded)
						}
						onSelectDate={(date) => {
							setWorryState({
								...worryState,
								dateRecorded: date ?? new Date(),
							});
						}}
						className={classNames.dateField}
					/>
					<br></br>
					<br></br>
					<DefaultButton
						onClick={onSubmit}
						primary={true}
						className={classNames.submitButton}
					>
						Submit
					</DefaultButton>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default DateForm;
