const Todo = require('../models/todos');

exports.createTodo = async (req,res,next) =>{
    try {
        const todos = await Todo.find().sort({createdAt: -1}); // la cac mang todo theo thu tu tu moi den cu
        res.json(todos);
    } catch (error) {
        next(error); // neu loi thi chuyen den middleware
    }
}

exports.getTodos = async (req,res,next) =>{
    try {
        if (!req.body.text) {
            return res.status(400).json({message: 'Text is required'});
        }
    
    const todos = await Todo.create({
        text: req.body.text
    });
    res.status(201).json(todos);
    } catch (error) {
        next(error);
    }
}

exports.toggleTodo = async (req,res,next) =>{
    try {
        const todo = await Todo.findById( req.params.id);
        if (!todo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    }
    catch (error) {
        next(error);
    }   
}

exports.deleteTodo = async (req,res,next) =>{
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        await todo.remove();
        res.json({message: 'Todo deleted successfully'});
    }
    catch (error) {
        next(error);
    }   
}