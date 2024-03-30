export type Item = {
	id: string;
	title: string;
	description: string;
	intensity: number;
	triggers: string;
	dateRecorded: Date;
	judgments: string;
	symptoms: string;
	copingStrategies: string;
	dateResolved: Date;
	resolved: boolean;
};