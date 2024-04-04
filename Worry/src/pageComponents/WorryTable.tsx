import { FontIcon, mergeStyleSets } from "@fluentui/react";
import { Worry } from "../types/Worry";
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
	data: Worry[];
	headers: TableHeader[];
};

export const WorryTable = ({ data, headers }: Args) => {
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
					<tbody>
						{data.map((d) => (
							<>
								<tr key={d.id}>
									<td>{d.title}</td>
									<td
										style={{
											textAlign: "center",
										}}
									>
										{d.description}
									</td>
									<td className={classNames.smallTableHeader}>
										{new Date(
											d.dateRecorded
										).toLocaleDateString()}
									</td>
									{d.resolved ? (
										<>
											<td
												className={
													classNames.smallTableHeader
												}
											>
												{d.dateResolved &&
													new Date(
														d.dateResolved
													).toLocaleDateString()}
											</td>
										</>
									) : (
										<td
											className={
												classNames.smallTableHeader
											}
										>
											{"Unresolved"}
										</td>
									)}
									<td className={classNames.smallTableHeader}>
										{d.intensity}
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
