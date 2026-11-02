export type FestEvent = {
	slug: string;
	title: string;
	category: 'Cultural' | 'Technical' | 'Sports' | 'Workshop' | 'Other';
	day: number;
	time: string;
	venue: string;
	description: string;
	registerUrl?: string;
};

// Placeholder entries. Replace with the real schedule.
export const events: FestEvent[] = [
	{
		slug: 'opening-night',
		title: 'Opening Night',
		category: 'Cultural',
		day: 1,
		time: '18:00',
		venue: 'Main Lawn',
		description: 'The fest opens with music and performances.'
	},
	{
		slug: 'math-quiz',
		title: 'Math Quiz',
		category: 'Technical',
		day: 1,
		time: '11:00',
		venue: 'Lecture Hall 1',
		description: 'Teams of three, five rounds, one trophy.'
	},
	{
		slug: 'football',
		title: 'Five-a-side Football',
		category: 'Sports',
		day: 2,
		time: '07:00',
		venue: 'Sports Ground',
		description: 'Knockout tournament open to all colleges.'
	}
];
