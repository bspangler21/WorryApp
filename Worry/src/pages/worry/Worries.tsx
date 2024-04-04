import { useEffect, useState } from "react";
import utilStyles from "../../styles/utilStyles.module.css";
import { Worry } from "../../types/Worry";
import { mockWorries } from "../../mockData/mockWorry";
import { FontIcon, mergeStyleSets, mergeStyles } from "@fluentui/react";
import { useDeleteWorry, useFetchWorries } from "../../hooks/WorryHooks";
import { useNavigate } from "react-router-dom";
import { WorryTable } from "../../pageComponents/WorryTable";
import { TableHeader } from "../../types/TableHeader";

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

	const worryHeaders: TableHeader[] = [
		{ name: "Title" },
		{ name: "Description" },
		{ name: "Date Recorded" },
		{ name: "Date Resolved" },
		{ name: "Intensity" },
	];

	const elements = worries.map((w) => {
		return (
			<>
				<tr key={w.id} className={classNames.tableRow}>
					<td>{w.title}</td>
					<td
						style={{
							textAlign: "center",
						}}
					>
						{w.description}
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

	return <WorryTable headers={worryHeaders} elements={elements} />;
};

export default Worries;
