const express = require('express');
const services = require('../services');

const router = express.Router();

// 로그인
router.post('/', function (req, res, next) {
  const email = req.body.email;
  const password = services.createHash(req.body.password);
  const userData = services.findUser(email);

  if (userData && userData.password === password) {
    const { password: _, ...user } = userData;
    const token = services.generateToken({ user });

    res.json({ token, user });
  } else {
    res.status(401).end();
  }
});

module.exports = router;
