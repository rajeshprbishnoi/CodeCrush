// Import Sequelize
const { Sequelize, DataTypes } = require("sequelize");

// initializing sequelize
const db = new Sequelize({
	dialect: "mysql",
	database: "codecrush",
	username: "codecrushdeveloper",
	password: "codecrushpassword",
});

const COL_ID_DEF = {
	type: Sequelize.DataTypes.INTEGER,
	autoIncrement: true,
	allowNull: false,
	primaryKey: true,
};

// user table;
const Users = db.define("user", {
	id: COL_ID_DEF,
	username: {
		type: Sequelize.DataTypes.STRING(30),
		unique: true,
		allowNull: false,
	},
	email: {
		type: Sequelize.DataTypes.STRING(100),
		unique: true,
	},
});

// Define the User model
const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

// Define the File model
const File = sequelize.define(
	"File",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		filename: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.BLOB("long"),
			allowNull: false,
		},
		content_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

// Define the association between User and File
User.hasMany(File);
File.belongsTo(User);

module.exports = {
	db,
	Users,
};
