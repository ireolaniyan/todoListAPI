'use strict'
const express = require('express');
var todoList = require('../controllers/todoListController')
const router = express.Router();

router.get('/', todoList.list_alll_tasks)
    .post('/', todoList.create_a_task);

router.get('/:id', todoList.read_a_task)
    .put('/:id', todoList.update_a_task)
    .delete('/:id', todoList.delete_a_task);


module.exports = router;
