const Todo = require('../models/todos');

exports.createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const todo = await Todo.create({ 
      text,
      user: req.userId 
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

exports.toggleTodo = async (req,res,next) =>{
    try {
        const todo = await Todo.findOne({ 
          _id: req.params.id, 
          user: req.userId 
        });
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
        const todo = await Todo.findOneAndDelete({ 
          _id: req.params.id, 
          user: req.userId 
        });
        if (!todo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        res.json({message: 'Todo deleted successfully'});
    }
    catch (error) {
        next(error);
    }   
}