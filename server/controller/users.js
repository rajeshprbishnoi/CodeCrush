const model = require("../db/model.js");
const Users = model.Users;

const { getRandomUserName } = require("../Utils/username.js");

async function createAnonUser() {
	const user = await Users.create({
		username: getRandomUsername(),
	});

	return user;
}

module.exports = {
	createAnonUser,
};
