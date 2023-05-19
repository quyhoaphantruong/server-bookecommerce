const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
module.exports = {
  signup: async (req, res) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(401).json({
          msg: "username bắt buộc",
        });
      }

      const usernameExist = await User.findOne({ username });

      if (usernameExist) {
        return res.status(401).json({
          msg: "username đã được đăng ký",
        });
      }

      const hashPass = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username,
        password: hashPass,
      });
      await newUser.save();

      const token = generateToken({ id: newUser._id });
      res.status(201).json({ token, user: newUser });
    } catch (err) {
      res.json(err.message);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    const usernameExist = await User.findOne({ username }).populate(
      "profileImage"
    );
    if (!usernameExist) {
      return res.status(401).json({ msg: "Username chưa đăng ký" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      usernameExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Mật khẩu không đúng" });
    }
    const token = generateToken({ id: usernameExist._id });
    return res.status(201).json({
      token,
      user: usernameExist,
    });
  },
};
