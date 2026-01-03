const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Tất cả routes đều cần authentication
router.use(authMiddleware);

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.patch('/:id', todoController.toggleTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;