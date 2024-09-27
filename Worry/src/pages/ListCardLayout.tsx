import { mergeStyleSets } from "@fluentui/react";
import { mockWorryList } from "../types/Worry";

const worriesToDisplay: Worry[] = mockWorryList;

const classNames = mergeStyleSets({
	container: {
		padding: "20px",
	},
	table: {
		width: "80%",
		borderCollapse: "collapse",
	},
	th: {
		border: "1px solid black",
		padding: "4px",
		backgroundColor: "#e6e7e8",
		"hover": {
			backgroundColor: "#000000",
		},
	},
	td: {
		border: "1px solid black",
		padding: "4px",
	},
	text: {
		marginBottom: "20px",
	},
});

const ListCardLayout = () => {
	return (
		<div className={classNames.container}>
			<p className={classNames.text}>Some text</p>
			<table className={classNames.table}>
				<thead>
					<tr>
						<th className={classNames.th}>Title</th>
						<th className={classNames.th}>Intensity</th>
					</tr>
				</thead>
				<tbody>
					{worriesToDisplay.map((worry) => (
						<tr>
							<td className={classNames.td}>{worry.title}</td>
							<td className={classNames.td}>{worry.intensity}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListCardLayout;
