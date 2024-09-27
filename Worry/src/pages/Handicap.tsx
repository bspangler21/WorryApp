type Hole = {
	number: number;
	difficulty: number;
};

type Player = {
	name: string;
	handicap: number;
};

function calculateStrokes(
	player1: Player,
	player2: Player,
	holes: Hole[]
): { [key: number]: number } {
	const handicapDifference = Math.abs(player1.handicap - player2.handicap);
	const strokes: { [key: number]: number } = {};

	// Sort holes by difficulty (hardest to easiest)
	holes.sort((a, b) => a.difficulty - b.difficulty);

	// Distribute strokes
	for (let i = 0; i < handicapDifference; i++) {
		const holeIndex = i % holes.length;
		const holeNumber = holes[holeIndex].number;
		strokes[holeNumber] = (strokes[holeNumber] || 0) + 1;
	}

	return strokes;
}

// Example usage:
const player1: Player = { name: "Alice", handicap: 5 };
const player2: Player = { name: "Bob", handicap: 19 };

const holes: Hole[] = [
	{ number: 1, difficulty: 3 },
	{ number: 2, difficulty: 1 },
	{ number: 3, difficulty: 2 },
	{ number: 4, difficulty: 4 },
	{ number: 5, difficulty: 6 },
	{ number: 6, difficulty: 5 },
	{ number: 7, difficulty: 7 },
	{ number: 8, difficulty: 9 },
	{ number: 9, difficulty: 8 },
];

const strokes = calculateStrokes(player1, player2, holes);
console.log(strokes);

const Handicap = () => {
	return <p>{JSON.stringify(strokes)}</p>;
};

export default Handicap;
