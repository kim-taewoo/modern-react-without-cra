const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// DB 생성
const fileAdapter = new FileSync('db.json');
const database = low(fileAdapter);

// 초기화
database.defaults({ posts: [], users: [], comments: {}, likes: {} }).write();

module.exports = database;
