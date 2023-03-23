const adjectives = [
	"visible",
	"roasted",
	"quick",
	"heavy",
	"violent",
	"alluring",
	"periodic",
	"fertile",
	"magical",
	"cloudy",
];

const objects = [
	"crowbar",
	"carrot",
	"acorn",
	"bottle",
	"bread",
	"pinecone",
	"cookie",
	"turtle",
	"soap",
	"wrench",
];

function getRandomUsername() {
	const adj = adjectives[Math.floor(Math.random() * 10)];
	const obj = objects[Math.floor(Math.random() * 10)];
	// return adj + " - " + obj;
	return `${adj}-${obj}`;
}

module.exports = {
	getRandomUsername,
};
