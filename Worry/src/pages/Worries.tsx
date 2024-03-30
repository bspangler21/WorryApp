import { useEffect, useState } from "react";
import utilStyles from "../styles/utilStyles.module.css";
import { Worry } from "../types/Worry";
import { mockWorries } from "../mockData/mockWorry";
import { mergeStyleSets } from "@fluentui/react";

const classNames = mergeStyleSets({
	smallTableHeader: {
		textAlign: "center",
		width: "300px",
	},
});

const Worries = () => {
	const [worries, setWorries] = useState<Worry[]>([]);

	useEffect(() => {
		// const fetchData = async () => {
		//   const response = await fetch("http://localhost:5000/worries");
		//   const data = await response.json();
		//   setWorries(data);
		// };
		// fetchData();
		setWorries(mockWorries);
	}, [mockWorries]);

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
										{w.dateRecorded.toLocaleDateString()}
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
