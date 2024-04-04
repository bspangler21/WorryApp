import { useAddWorry } from "../../hooks/WorryHooks";
import ValidationSummary from "../../pageComponents/ValidationSummary";
import { Worry } from "../../types/Worry";
import WorryForm from "./WorryForm";

const AddWorry = () => {
	const addWorryMutation = useAddWorry();

	const worry: Worry = {
    title: "",
    description: "",
    dateRecorded: new Date(),
    dateResolved: new Date(),
    intensity: 0,
    resolved: false,
	};

	return (
		<>
			{addWorryMutation.isError && (
				<ValidationSummary error={addWorryMutation.error} />
			)}
			<WorryForm
				worry={worry}
				submitted={(worry) => addWorryMutation.mutate(worry)}
				isEdit={false}
			/>
		</>
	);
};

export default AddWorry;
