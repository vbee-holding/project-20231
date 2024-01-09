const User = require("../models/user");
const logger = require("../utils/logger");
const saveUser = async (req, res) => {
  const { email, image, name, isNotifi } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(200).send("Người dùng đã tồn tại") && logger.info({status: 200, message: "Người dùng đã tồn tại", data: req.body}) ;
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
      res.status(200).send("Người dùng đã được thêm vào collection users")
      logger.info({status: 200, message: "Người dùng đã được thêm vào collection users", data: newUser,url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers}) ;
    }
  } catch (error) {
    res.status(500).send("Lỗi xử lý yêu cầu") && logger.error({status: 500, message: "Lỗi xử lý yêu cầu", data : req.body, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
  }
};

module.exports = saveUser;
