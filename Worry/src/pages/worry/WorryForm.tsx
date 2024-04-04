import {
	Checkbox,
	DatePicker,
	DefaultButton,
	ITheme,
	SpinButton,
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
	spinButton: {
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

const WorryForm = ({ worry, submitted, isEdit }: Args) => {
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
						value={worryState.description}
						multiline
						rows={3}
						onChange={(event, newValue) => {
							console.log("newValue", newValue);
							setWorryState({
								...worryState,
								description: newValue,
							});
						}}
						className={classNames.largeTextField}
					></TextField>
					<TextField
						label="Symptoms"
						value={worryState.symptoms}
						multiline
						rows={4}
						onChange={(event, newValue) => {
							console.log("newValue", newValue);
							setWorryState({
								...worryState,
								symptoms: newValue,
							});
						}}
						className={classNames.largeTextField}
					></TextField>
					<TextField
						label="Coping Strategies"
						value={worryState.copingStrategies}
						multiline
						rows={3}
						onChange={(event, newValue) => {
							console.log("newValue", newValue);
							setWorryState({
								...worryState,
								copingStrategies: newValue,
							});
						}}
						className={classNames.largeTextField}
					></TextField>
					<TextField
						label="Judgments"
						value={worryState.judgments}
						multiline
						rows={
							worryState.judgments &&
							worryState.judgments?.length > 200
								? 4
								: 3
						}
						onChange={(event, newValue) => {
							console.log("newValue", newValue);
							setWorryState({
								...worryState,
								judgments: newValue,
							});
						}}
						className={classNames.largeTextField}
					></TextField>
					<TextField
						label="Intensity"
						required
						value={
							isEdit
								? worry.intensity.toString()
								: worryState.intensity.toString()
						}
						onChange={(event, newValue) => {
							setWorryState({
								...worryState,
								intensity: Number(newValue) ?? 0,
							});
						}}
						className={classNames.regularTextField}
					></TextField>
					<DatePicker
						label="Date Recorded"
						placeholder="Select a date..."
						isRequired={true}
						value={new Date(worryState.dateRecorded)}
						onSelectDate={(date) => {
							setWorryState({
								...worryState,
								dateRecorded: date ?? new Date(),
							});
						}}
						className={classNames.dateField}
					/>
					<br></br>
					<Checkbox
						className={classNames.regularTextField}
						label="Resolved?"
						defaultChecked={worryState.resolved}
						onChange={() =>
							setWorryState({
								...worryState,
								resolved: !worryState.resolved,
							})
						}
					/>
					{worryState.resolved && (
						<DatePicker
							label="Date Resolved"
							placeholder="Select a date..."
							value={
								worryState.dateResolved &&
								new Date(worryState.dateResolved)
							}
							onSelectDate={(date) => {
								setWorryState({
									...worryState,
									dateResolved:
										date && worryState.resolved
											? new Date(date)
											: undefined,
								});
							}}
							className={classNames.dateField}
						/>
					)}
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

export default WorryForm;
