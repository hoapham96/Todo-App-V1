const router = require('express').Router();
const { Todo } = require('../../models');
const router = require('express').Router();

// POST /todos
router.post('/todos', async (req, res) => {
    try {
        const createdTodo = await Todo.create({
            todo_text: req.body.todo_text,
            is_completed: req.body.is_completed,
            created_at: new Date()
        })
        console.log(createdTodo);
        res.json(createdTodo)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// GET /todos
router.get('/todos', withAuth, async (req, res) => {
    console.log(req.session);
    try {
        const todo = await Todo.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        console.log(todo);
        res.json(todo);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// PUT /todos
router.put('/todos/:id', withAuth, async (req, res) => {
    console.log(req.session);
    try {
        const updatedTodo = await Todo.update({ 
            todo_text: req.body.todo_text,
            is_completed: req.body.is_completed,
            updated_at: new Date(),
            }, {
            where: {
                user_id: req.session.user_id,
                id: req.params.id
            }
        });
        console.log(updatedTodo);
        res.json(updatedTodo)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// DELETE /todos
router.delete('/todos/:id', withAuth, async (req, res) => {
    try {
        await Todo.destroy({
        where: {
            user_id: req.session.user_id,
            id: req.params.id
        }
      });
      res.send('Successfully delete the todo')
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;