import { mockWorries } from "../mockData/mockWorry";
import { Worry } from "../types/Worry";

export function getWorryById(id: string, allWorrys: Worry[]): Worry {
	// const { data: worryData } = useFetchWorrys();
	const worry: Worry[] = allWorrys ?? mockWorries;
	const worryDetail: Worry = {} as Worry;

	if (worry) {
		worry.forEach((w) => {
			if (w.id === id) {
				(worryDetail.id = w.id),
					(worryDetail.title = w.title),
					(worryDetail.description = w.description),
					(worryDetail.symptoms = w.symptoms),
					(worryDetail.intensity = w.intensity),
					(worryDetail.triggers = w.triggers),
					(worryDetail.dateRecorded = w.dateRecorded),
					(worryDetail.judgments = w.judgments),
					(worryDetail.copingStrategies = w.copingStrategies),
					(worryDetail.dateResolved = w.dateResolved),
					(worryDetail.resolved = w.resolved);
			}
		});
	}

	return worryDetail;
}
