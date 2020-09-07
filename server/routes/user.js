const express = require('express');
const multer = require('multer');
const services = require('../services');
const checkToken = require('../middleware/checkToken');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// 회원 가입
router.post('/join', upload.single('file'), function (req, res) {
  const { email, name } = req.body;
  const password = services.createHash(req.body.password);
  const profileImage = 'http://localhost:8080/' + req.file.path;

  if (!services.findUser(email)) {
    services.addUser({ email, name, password, profileImage });
    res.status(201).end();
  } else {
    res.status(409).end();
  }
});

// 토큰 확인 (사용자 정보)
router.get('/me', checkToken, function (req, res) {
  const { user } = req;
  res.json({ user });
});

module.exports = router;
