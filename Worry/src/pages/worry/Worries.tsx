import { useEffect, useState } from "react";
import utilStyles from "../../styles/utilStyles.module.css";
import { Worry } from "../../types/Worry";
import { mockWorries } from "../../mockData/mockWorry";
import { FontIcon, mergeStyleSets, mergeStyles } from "@fluentui/react";
import { useDeleteWorry, useFetchWorries } from "../../hooks/WorryHooks";
import { useNavigate } from "react-router-dom";

const classNames = mergeStyleSets({
	smallTableHeader: {
		textAlign: "center",
		width: "300px",
	},
	tableRow: {
		height: "75px",
		cursor: "pointer",
	},
});

const iconClass = mergeStyles({
	fontSize: 25,
	height: 25,
	width: 25,
	margin: "0 5px",
});

const Worries = () => {
	const nav = useNavigate();
	const [worries, setWorries] = useState<Worry[]>([]);

	const { data } = useFetchWorries();
	const deleteWorryMutation = useDeleteWorry();

	useEffect(() => {
		setWorries(data ?? mockWorries);
	}, [data]);

	const worryHeaders = [
		"Title",
		"Description",
		"Date Recorded",
		"Date Resolved",
		"Intensity",
		"",
	];

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<table>
					<thead>
						<tr>
							<th className={utilStyles.tableHeaderWidth}>
								Title
							</th>
							<th className={utilStyles.tableHeaderWidth}>
								Description
							</th>
							<th className={utilStyles.tableHeaderWidth}>
								Date Recorded
							</th>
							<th className={utilStyles.tableHeaderWidth}>
								Date Resolved
							</th>
							<th className={utilStyles.tableHeaderWidth}>
								Intensity
							</th>
							<th className={utilStyles.tableHeaderWidth}></th>
						</tr>
					</thead>
					<tbody>
						{worries.map((w) => {
							console.log(w);
							return (
								<>
									<tr
										key={w.id}
										className={classNames.tableRow}
										onClick={() =>
											nav(`/worry/edit/${w.id}`)
										}
									>
										<td>{w.title}</td>
										<td
											style={{
												textAlign: "center",
											}}
										>
											{w.description}
										</td>
										<td
											className={
												classNames.smallTableHeader
											}
										>
											{new Date(
												w.dateRecorded
											).toLocaleDateString()}
										</td>
										{w.resolved ? (
											<>
												<td
													className={
														classNames.smallTableHeader
													}
												>
													{w.dateResolved &&
														new Date(
															w.dateResolved
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
										<td
											className={
												classNames.smallTableHeader
											}
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
													deleteWorryMutation.mutate(
														w
													);
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
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Worries;
