const crypto = require('crypto');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const database = require('../database');

const id = () => `${Date.now()}-${shortid.generate()}`;

const refinePost = (post, userId) => {
  const likes = database.get(`likes[${post.id}]`, []).value();

  return {
    ...post,
    likes: likes.length,
    likesOfMe: likes.includes(userId),
  };
};

exports.likePost = function likePost(userId, postId) {
  const post = database.get('posts').find({ id: postId }).value();
  const likes = database.get(`likes`, {}).get(postId, []).xor([userId]).value();

  database
    .get(`likes`, {})
    .assign({ [postId]: likes })
    .write();

  return refinePost(post, userId);
};

exports.writePost = function writePost(data) {
  const post = { id: id(), ...data };
  database.get('posts', []).unshift(post).write();

  return refinePost(post, post.writer.id);
};

exports.readPosts = function readPosts(offset, limit, userId) {
  return database
    .get('posts', [])
    .orderBy(['id'], ['desc'])
    .drop(offset)
    .take(limit)
    .flatMap((post) => refinePost(post, userId))
    .value();
};

exports.readUserPosts = function readPosts(offset, limit, postUserId, currentUserId) {
  return database
    .get('posts', [])
    .filter((o) => o.writer.id === postUserId)
    .orderBy(['id'], ['desc'])
    .drop(offset)
    .take(limit)
    .flatMap((post) => refinePost(post, currentUserId))
    .value();
};

exports.writeComment = function writeComment(comment) {
  const prevComments = database.get(`comments`, {}).get(comment.postId, []).value();
  const newComment = { id: id(), ...comment };

  database
    .get(`comments`, {})
    .assign({ [comment.postId]: [newComment, ...prevComments] })
    .write();

  return newComment;
};

exports.readComments = function readComments(postId) {
  return database.get(`comments[${postId}]`, []).orderBy(['id'], ['desc']).value();
};

exports.findUser = function findUser(email) {
  return database.get('users', []).find({ email }).value();
};

exports.addUser = function addUser(user) {
  database
    .get('users', [])
    .push({ id: id(), ...user })
    .write();
};

exports.verifyToken = function verifyToken(token) {
  const data = jwt.verify(token, 'secret');
  return data;
};

exports.generateToken = function generateToken(data) {
  const token = jwt.sign(data, 'secret');
  return token;
};

exports.createHash = function createHash(data) {
  const hash = crypto.createHash('sha512').update(data).digest('base64');
  return hash;
};
