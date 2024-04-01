export type Worry = {
	id?: string;
	title: string;
	description?: string;
	symptoms?: string;
	intensity: number;
	triggers?: string;
	dateRecorded: Date;
	judgments?: string;
	copingStrategies?: string;
	dateResolved?: Date;
	resolved?: boolean;
};
