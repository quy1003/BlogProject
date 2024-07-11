const express = require('express');
const router = express.Router();

const blogController = require('../app/controllers/BlogController');

//Đường dẫn, xử lí cho đường dẫn
router.post('/store', blogController.store);
router.get('/create', blogController.create);
router.post('/handle-form-action', blogController.handleFormAction)
router.patch('/:id/restore', blogController.restore);
router.put('/:id', blogController.update);
router.delete('/:id', blogController.delete);
router.delete('/:id/force', blogController.destroy);
router.get('/:id/edit', blogController.edit);
router.get('/:slug', blogController.show);

module.exports = router;
