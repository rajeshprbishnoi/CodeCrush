const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../db/model/user");
const { check, validationResult } = require("express-validator");

// User signup
router.post(
	"/signup",
	[
		// Validation middleware using express-validator
		check("email").isEmail().withMessage("Invalid email"),
		check("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	],
	async (req, res) => {
		// Validate request body
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		// Check if user already exists
		const { email, password } = req.body;
		let user = await User.findOne({ where: { email } });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		user = await User.create({ email, password: hashedPassword });

		// Create JWT token
		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(201).json({ message: "User created", token });
	}
);

// User login
router.post("/login", async (req, res) => {
	// Check if user exists
	const { email, password } = req.body;
	const user = await User.findOne({ where: { email } });
	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Check if password is correct
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Create JWT token
	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	res.json({ message: "Login successful", token });
});

module.exports = router;
