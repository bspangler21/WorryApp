import { useEffect, useState } from "react";
import utilStyles from "../styles/utilStyles.module.css";
import { Worry } from "../types/Worry";
import { mockWorries } from "../mockData/mockWorry";
import { mergeStyleSets } from "@fluentui/react";

const apiUrl = "http://localhost:4000/api";

const classNames = mergeStyleSets({
	smallTableHeader: {
		textAlign: "center",
		width: "300px",
	},
});

const Worries = () => {
	const [worries, setWorries] = useState<Worry[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${apiUrl}/Worry`);
			const data = await response.json();
			setWorries(data ?? mockWorries);
		};
		fetchData();
		// setWorries(mockWorries);
	}, [worries]);

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
						{worries.map((w) => (
							<>
								<tr key={w._id}>
									<td>{w.title}</td>
									<td>{w.description}</td>
									<td className={classNames.smallTableHeader}>
										{new Date(
											w.dateRecorded
										).toLocaleDateString()}
									</td>
									<td className={classNames.smallTableHeader}>
										{w.intensity}
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

export default Worries;
