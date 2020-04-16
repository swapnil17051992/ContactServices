/** @format */

const express = require("express");

const router = express.Router();

const Contact = require("../modal/contact");
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

//@route GET '/api/contacts'
//@desc  Get all User Contact
//@access public
router.get("/", auth, async (req, res) => {
	try {
		const contact = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});

		res.json(contact);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Server error" });
	}

	// res.send('Get all Contact User');
});

//@route   Post '/api/contacts'
//@desc    Add New Contact
//@access  public

router.post(
	"/",
	auth,
	[
		check("name", "Please enter name").not().isEmpty(),
		check("email", "Please enter valid email").isEmail(),
		check("phone", "Minimum 10 length").isLength({ min: 10, max: 12 }),
	],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(402).json({ err: err.array() });
		}

		const { name, email, phone, type } = req.body;

		try {
			const newcontact = new Contact({
				name,
				phone,
				email,
				type,
				user: req.user.id,
			});

			const contact = await newcontact.save();

			res.json(contact);
		} catch (error) {
			console.log(error.message);
			return res.status(500).json({ msg: "Server Error" });
		}
		//res.send('Add new Contact');
	}
);

//@route   PUT '/api/contacts'
//@desc   Update contact
//@access  public

router.put("/:id", auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	//create new object and assign to properties to new object
	const contactfields = {};
	if (name) contactfields.name = name;
	if (email) contactfields.email = email;
	if (phone) contactfields.phone = phone;
	if (type) contactfields.type = type;

	try {
		// console.log(req.params.id)
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		//console.log(contact)
		//make sure update perticular user not any one
		if (contact.user.toString() !== req.user.id) {
			console.log("swap");
			return res.status(401).json({ msg: "UnAuthorised user" });
		}

		console.log("ssss");
		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactfields },
			{ new: true }
		);

		res.json(contact);
	} catch (error) {
		return res.status(500).json({ msg: "Server Error" });
	}

	//res.send('Update Contact');
});

//@route   Delete '/api/contacts'
//@desc    Delete existing contact
//@access  public

router.delete("/:id", auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: "Contact Not found" });

		//make sure correct authorized user

		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "UnAuthrized User" });
		}

		await Contact.findByIdAndDelete(req.params.id);

		res.json({ msg: "Contact deleted successfully !!" });
	} catch (error) {
		res.status(500).json({ msg: "Server Error" });
	}
	res.send("Delete Contact");
});

module.exports = router;
