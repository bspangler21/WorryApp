import { mergeStyleSets } from "@fluentui/react";

import { TableHeader } from "../types/TableHeader";

const classNames = mergeStyleSets({
	centeredTableHeader: {
		display: "flex",
		justifyContent: "center",
	},
	tableRow: {
		height: "75px",
		cursor: "pointer",
	},
	smallTableHeader: {
		textAlign: "center",
		width: "300px",
	},
});

type Args = {
	headers: TableHeader[];
	elements: JSX.Element[];
};

export const WorryTable = ({ headers, elements }: Args) => {
	return (
		<>
			<div className={classNames.centeredTableHeader}>
				<table>
					<thead>
						<tr>
							{headers.map((h) => (
								<th>{h.name}</th>
							))}
						</tr>
					</thead>
					<tbody>{elements}</tbody>
				</table>
			</div>
		</>
	);
};
