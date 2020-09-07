const express = require('express');
const checkToken = require('../middleware/checkToken');
const services = require('../services');

const router = express.Router();

// 포스트 like
router.patch('/:postId/like', checkToken, function (req, res) {
  const post = services.likePost(req.user.id, req.params.postId);
  res.json({ post });
});

// 코멘트 작성
router.post('/:postId/comment', checkToken, function (req, res) {
  const comment = services.writeComment({
    postId: req.params.postId,
    writer: req.user,
    contents: req.body.contents,
    createdAt: Date.now(),
  });
  res.json({ comment });
});

// 코멘트 목록
router.get('/:postId/comment', checkToken, function (req, res) {
  const comments = services.readComments(req.params.postId);

  res.json({ comments });
});

// 포스트 작성
router.post('/', checkToken, function (req, res) {
  const post = services.writePost({
    writer: req.user,
    contents: req.body.contents,
    createdAt: Date.now(),
  });

  res.json({ post });
});

// 포스트 목록
router.get('/', checkToken, function (req, res) {
  const { offset = 0, limit = 5 } = req.query;
  const posts = services.readPosts(offset, limit, req.user.id);

  res.json({ posts });
});

// 유저별 포스트 목록
router.get('/of/:userId/', checkToken, function (req, res) {
  const { offset = 0, limit = 5 } = req.query;
  const posts = services.readUserPosts(offset, limit, req.params.userId, req.user.id);

  res.json({ posts });
});

module.exports = router;
