const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const CloudinaryImage = require("../models/CloudinaryImage");

const handleProfileImage = async (file) => {
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    file.path,
    { folder: "ecommerce" }
  );
  const newImage = new CloudinaryImage({
    publicId: public_id,
    imageUrl: secure_url,
  });
  await newImage.save();

  return newImage;
};

const deleteImage = async (file) => {
  try {
    const oldImage = await CloudinaryImage.findByIdAndDelete(file._id);
    await cloudinary.uploader.destroy(oldImage.publicId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.find().populate("profileImage");
    res.status(201).json(users);
  },
  getUser: async (req, res) => {
    const user = await User.findById(req.params.userId).populate(
      "profileImage"
    );
    res.status(200).json(user);
  },
  verifyUser: async (req, res) => {
    const user = await User.findById(req.user);
    res.status(200).json(user);
  },
  deleteAll: async (req, res) => {
    await User.deleteMany();
    res.json({ msg: "Deleted All" });
  },
  deleteUserImage: async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    res.json({ msg: "Tính năng chưa hoàn thành" });
  },
  deleteUser: async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user.profileImage) {
      const imageOfUser = await CloudinaryImage.findByIdAndDelete(
        user.profileImage._id
      );
      await cloudinary.uploader.destroy(imageOfUser.publicId);
    }
    res.status(200).json({
      msg: "Deleted successfully",
    });
  },
  updateUser: async (req, res) => {
    const { password } = req.body;
    // if user has already had profileImage, delete it before update
    const user = await User.findById(req.params.userId);
    if (req.file) {
      const profileImage = await handleProfileImage(req.file);
      if (user.profileImage) {
        await deleteImage(user.profileImage);
      }
      user.profileImage = profileImage;
      await user.save();
      return res.status(201).json(user);
    }
    if (password) {
      let hashPass = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            ...req.body,
            password: hashPass,
          },
        },
        { new: true }
      );
      res.status(200).json(user);
    } else {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: { ...req.body },
        },
        { new: true }
      );

      if (!user) {
        return res.status(401).json({
          msg: "Người dùng này không tồn tại",
        });
      }
      res.status(200).json(user);
    }
  },
};
