import { mergeStyleSets } from "@fluentui/react";
import { Worry } from "../types/Worry";

const classNames = mergeStyleSets({
	centeredTableHeader: {
		display: "flex",
		justifyContent: "center",
	},
	tableRow: {
		height: "75px",
		cursor: "pointer",
	},
});

export const WorryTable = (data: Worry[], headers: string[]) => {
	return (
		<>
			<div className={classNames.centeredTableHeader}>
				<table>
					<thead><tr>{headers.map((h) => <th></th>)} </tr></thead>
				</table>
			</div>
		</>
	);
};
