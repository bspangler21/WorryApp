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

export const mockWorryList: Worry[] = [
	{
		title: "Worry 1",
		intensity: 5,
		dateRecorded: new Date(),
	},
	{
		title: "Worry 2",
		intensity: 7,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 2)),
	},
	{
		title: "Worry 3",
		intensity: 3,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 3)),
	},
	{
		title: "Worry 4",
		intensity: 8,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 4)),
	},
	{
		title: "Worry 5",
		intensity: 2,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 4)),
	},
	{
		title: "Worry 6",
		intensity: 9,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 4)),
	},
	{
		title: "Worry 7",
		intensity: 1,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 5)),
	},
	{
		title: "Worry 8",
		intensity: 6,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 6)),
	},
	{
		title: "Worry 9",
		intensity: 4,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 7)),
	},
	{
		title: "Worry 10",
		intensity: 10,
		dateRecorded: new Date(new Date().setDate(new Date().getDate() + 8)),
	},
];
