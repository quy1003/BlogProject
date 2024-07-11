const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

//Đường dẫn, xử lí cho đường dẫn
router.get('/stored/blogs', meController.storedBlogs);
router.get('/trash/blogs', meController.trashBlogs);
module.exports = router;
