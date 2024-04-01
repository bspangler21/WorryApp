import { useParams } from "react-router-dom";
import {
	useFetchWorries,
	useFetchWorry,
	useUpdateWorry,
} from "../../hooks/WorryHooks";
import { getWorryById } from "../../util/worryUtils";
import { Worry } from "../../types/Worry";
import ValidationSummary from "../../pageComponents/ValidationSummary";
import WorryForm from "./WorryForm";

type Args = {
	status: "idle" | "success" | "error" | "loading";
};

const ApiStatus = ({ status }: Args) => {
	switch (status) {
		case "error":
			return <div>Error communicating with the data backend</div>;
		case "idle":
			return <div>Idle</div>;
		case "loading":
			return <div>Loading..</div>;
		default:
			throw Error("Unknown API state");
	}
};

let worryData: Worry = {} as Worry;

const EditWorry = () => {
	const { id } = useParams();
	if (!id) throw Error("Need a worry id");
	const worryId = id;
	console.log("worryId", worryId);
	const { data: worriesData } = useFetchWorries();
	const { data, status, isSuccess } = useFetchWorry(worryId);
	const updateWorryMutation = useUpdateWorry();

	console.log("data", data);

	if (!isSuccess) return <ApiStatus status={status} />;

	worryData = data ?? getWorryById(worryId, worriesData ?? []);

	// useEffect(() => {
	// 	worryData = data ?? getWorryById(worryId, mockWorrys);
	// }, [data]);

	console.log("worryData", worryData);

	const worry: Worry = {
		id: worryData.id,
		title: worryData.title,
		description: worryData.description,
		symptoms: worryData.symptoms,
		intensity: worryData.intensity,
		triggers: worryData.triggers,
		dateRecorded: worryData.dateRecorded,
		judgments: worryData.judgments,
		copingStrategies: worryData.copingStrategies,
		dateResolved: worryData.dateResolved,
		resolved: worryData.resolved,
	};

	console.log("worry", worry);

	return (
		<>
			{updateWorryMutation.isError && (
				<ValidationSummary error={updateWorryMutation.error} />
			)}
			{worry && (
				<WorryForm
					worry={worry}
					submitted={(w) => {
						updateWorryMutation.mutate(w);
					}}
					isEdit={true}
				/>
			)}
		</>
	);
};

export default EditWorry;
