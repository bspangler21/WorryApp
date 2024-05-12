import { useEffect, useState } from "react";
import utilStyles from "../../styles/utilStyles.module.css";
import { Worry } from "../../types/Worry";

import {
	DefaultButton,
	Dropdown,
	FontIcon,
	IDropdownOption,
	ITheme,
	ThemeProvider,
	createTheme,
	mergeStyleSets,
	mergeStyles,
} from "@fluentui/react";
import { useDeleteWorry, useFetchWorries } from "../../hooks/WorryHooks";
import { useNavigate } from "react-router-dom";
import { WorryTable } from "../../pageComponents/WorryTable";
import { TableHeader } from "../../types/TableHeader";
import { fluentPalette } from "../../util/fluentPalette";
import { saveAs } from "file-saver";

const fluentTheme: ITheme = createTheme({ palette: fluentPalette });

const classNames = mergeStyleSets({
	regularCenterTableHeader: {
		textAlign: "center",
		width: "300px",
	},
	regularLeftTableHeader: {
		textAlign: "start",
		width: "350px",
	},
	smallTableHeader: {
		textAlign: "center",
		width: "200px",
	},
	tableRow: {
		height: "75px",
		cursor: "pointer",
	},
	dropdownLight: {
		width: "300px",
		margin: "20px",
		padding: "10px",
		backgroundColor: "#ffffff",
		color: "#000000",
	},
	dropdownDark: {
		width: "300px",
		margin: "20px",
		padding: "10px",
		backgroundColor: "#000000",
		color: "#ffffff",
	},
});

const iconClass = mergeStyles({
	fontSize: 25,
	height: 25,
	width: 25,
	margin: "0 5px",
});

const options: IDropdownOption[] = [
	{ key: "currentMonth", text: "Current month" },
	{ key: "lastMonth", text: "Last month" },
	{ key: "all", text: "All" },
];

const isDarkMode =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

if (isDarkMode) {
	console.log("Dark mode is on");
} else {
	console.log("Light mode is on");
}

let csvContent: string =
	"Title,Description,Judgments,Date Recorded,Intensity\n";

const Worries = () => {
	const nav = useNavigate();
	const [worries, setWorries] = useState<Worry[]>([]);
	const [worriesToDisplay, setWorriesToDisplay] = useState<Worry[]>([]);

	const { data } = useFetchWorries();
	const deleteWorryMutation = useDeleteWorry();

	useEffect(() => {
		// setWorries(data ?? mockWorries);
		// setWorriesToDisplay(data ?? mockWorries);
		setWorries(data ?? []);
		setWorriesToDisplay(data ?? []);
	}, [data]);

	const downloadWorries = () => {
		// const element = document.createElement("a");
		// const file = new Blob([JSON.stringify(worries)], {
		// 	type: "text/plain",
		// });
		// element.href = URL.createObjectURL(file);
		// element.download = "worries.json";
		// document.body.appendChild(element); // Required for this to work in FireFox
		// element.click();
		worries.forEach((w) => {
			csvContent += `${w.title},${w.description},${w.judgments},${w.dateRecorded},${w.intensity}\n`;
		});
		const blob = new Blob([csvContent], {
			type: "text/csv;charset=utf-8;",
		});
		saveAs(blob, "worries.csv");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const filterWorries = (
		event: React.FormEvent<HTMLDivElement>,
		option: IDropdownOption | undefined,
		index?: number | undefined
	): void => {
		if (!option) {
			return;
		}
		switch (option?.key) {
			case "currentMonth":
				setWorriesToDisplay(
					worries.filter(
						(w) =>
							new Date(w.dateRecorded).getMonth() ===
								new Date().getMonth() &&
							new Date(w.dateRecorded).getFullYear() ===
								new Date().getFullYear()
					)
				);
				break;
			case "lastMonth":
				setWorriesToDisplay(
					worries.filter(
						(w) =>
							new Date(w.dateRecorded).getMonth() ===
								new Date().getMonth() - 1 &&
							new Date(w.dateRecorded).getFullYear() ===
								new Date().getFullYear()
					)
				);
				break;
			case "all":
				setWorriesToDisplay(worries);
				break;
		}
	};

	const worryHeaders: TableHeader[] = [
		{ name: "Title" },
		{ name: "Description" },
		{ name: "Date Recorded" },
		{ name: "Date Resolved" },
		{ name: "Intensity" },
	];

	const elements = worriesToDisplay
		.sort((a, b) => (a.dateRecorded > b.dateRecorded ? 1 : -1))
		.map((w) => {
			return (
				<>
					<tr key={w.id} className={classNames.tableRow}>
						<td
							onClick={() => nav(`/worry/edit/${w.id}`)}
							className={classNames.regularLeftTableHeader}
						>
							{w.title}
						</td>
						<td
							className={classNames.regularLeftTableHeader}
							onClick={() => nav(`/worry/edit/${w.id}`)}
						>
							{w.description && w.description?.length > 125
								? w.description?.substring(0, 125) + "..."
								: w.description}
						</td>
						<td
							className={classNames.smallTableHeader}
							onClick={() => nav(`/worry/edit/${w.id}`)}
						>
							{new Date(w.dateRecorded).toLocaleDateString()}
						</td>
						{w.resolved ? (
							<>
								<td
									className={classNames.smallTableHeader}
									onClick={() => nav(`/worry/edit/${w.id}`)}
								>
									{w.dateResolved &&
										new Date(
											w.dateResolved
										).toLocaleDateString()}
								</td>
							</>
						) : (
							<td
								className={classNames.smallTableHeader}
								onClick={() => nav(`/worry/edit/${w.id}`)}
							>
								{"Unresolved"}
							</td>
						)}
						<td
							className={classNames.smallTableHeader}
							onClick={() => nav(`/worry/edit/${w.id}`)}
						>
							{w.intensity}
						</td>
						<td
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you want to delete this entry?"
									)
								) {
									deleteWorryMutation.mutate(w);
								}
							}}
						>
							<FontIcon
								aria-label="Delete"
								iconName="Delete"
								className={iconClass}
							/>
						</td>
					</tr>
				</>
			);
		});

	return (
		// <ThemeProvider theme={fluentTheme}>
		<>
			<div>
				<Dropdown
					label="Filter by date"
					options={options}
					className={
						isDarkMode
							? classNames.dropdownDark
							: classNames.dropdownLight
					}
					// selectedKey={}
					onChange={filterWorries}
				/>
				<DefaultButton
					text="Download Worries"
					onClick={downloadWorries}
				/>
			</div>
			<WorryTable headers={worryHeaders} elements={elements} />
		</>
		// </ThemeProvider>
	);
};

export default Worries;
