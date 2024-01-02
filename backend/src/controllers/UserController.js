const User = require("../models/user");

const saveUser = async (req, res) => {
  const { email, image, name, isNotifi } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(200).send("Người dùng đã tồn tại");
    else {
      const newUser = new User({
        email: email,
        profileImgUrl: image,
        username: name,
        isNotifi: isNotifi,
      });
      console.log(image);
      console.log(email);
      console.log(name);
      console.log(isNotifi);

      await newUser.save();
      res.status(200).send("Người dùng đã được thêm vào collection users");
    }
  } catch (error) {
    res.status(500).send("Lỗi xử lý yêu cầu");
  }
};

module.exports = saveUser;
