import { useEffect, useState } from "react";
// import utilStyles from "../../styles/utilStyles.module.css";
import { Worry } from "../../types/Worry";
import { mockWorries } from "../../mockData/mockWorry";
// import { FontIcon, mergeStyleSets, mergeStyles } from "@fluentui/react";
import { useFetchWorries } from "../../hooks/WorryHooks";
// import { useNavigate } from "react-router-dom";
import { WorryTable } from "../../pageComponents/WorryTable";
import { TableHeader } from "../../types/TableHeader";

// const classNames = mergeStyleSets({
// 	smallTableHeader: {
// 		textAlign: "center",
// 		width: "300px",
// 	},
// 	tableRow: {
// 		height: "75px",
// 		cursor: "pointer",
// 	},
// });

// const iconClass = mergeStyles({
// 	fontSize: 25,
// 	height: 25,
// 	width: 25,
// 	margin: "0 5px",
// });

const Worries = () => {
	// const nav = useNavigate();
	const [worries, setWorries] = useState<Worry[]>([]);

	const { data } = useFetchWorries();
	// const deleteWorryMutation = useDeleteWorry();

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

	return <WorryTable data={worries} headers={worryHeaders} />;
};

export default Worries;
