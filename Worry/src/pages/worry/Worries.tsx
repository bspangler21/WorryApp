import { useEffect, useState } from "react";
import utilStyles from "../../styles/utilStyles.module.css";
import { Worry } from "../../types/Worry";
import { mockWorries } from "../../mockData/mockWorry";
import { mergeStyleSets } from "@fluentui/react";
import { useFetchWorries } from "../../hooks/WorryHooks";
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

const Worries = () => {
	const nav = useNavigate();
	const [worries, setWorries] = useState<Worry[]>([]);

	const { data } = useFetchWorries();

	useEffect(() => {
		setWorries(data ?? mockWorries);
	}, [data]);


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
