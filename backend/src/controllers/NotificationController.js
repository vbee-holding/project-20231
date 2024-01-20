const express = require('express');
const User = require('../models/User');

const updateNotification = async (req, res) => {
  try {
    const { googleId } = req.body;

    // check validation of ID
    if (!googleId) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    // Find the user by googleId
    const user = await User.findOne({ googleId });

    // Toggle the value of isNotifi
    if (user) {
      user.isNotifi = !user.isNotifi;
      await user.save();
      return res.status(200).json({ message: 'Đã thay đổi cài đặt thông báo', isNotifi: user.isNotifi });
    } else {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi hệ thống' });
  }
};

module.exports = updateNotification;
