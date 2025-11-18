const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

const fileUpload = require('../middleware/file-upload');  // Import file upload middleware

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  fileUpload.single('image'), // handle image upload before validators so req.body is populated
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
