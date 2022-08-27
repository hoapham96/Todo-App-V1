const router = require('express').Router();
const { Todo } = require('../../models');
const withAuth = require('../../middlewares/auth')

// POST /todos
router.post('/todos', withAuth, async (req, res) => {
    try {
        const createdTodo = await Todo.create({
            todo_text: req.body.todo_text,
            is_completed: req.body.is_completed,
            user_id: req.user.id,
            created_at: new Date()
        })

        res.json(createdTodo)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// GET /todos
router.get('/todos', withAuth, async (req, res) => {
    try {
        const todo = await Todo.findAll({
            where: {
                user_id: req.user.id
            },
            raw:true
        })

        res.json(todo);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// PUT /todos
router.put('/todos/:id', withAuth, async (req, res) => {
    try {
        await Todo.update({ 
            todo_text: req.body.todo_text,
            is_completed: req.body.is_completed,
            updated_at: new Date(),
            }, {
            where: {
                user_id: req.user.id,
                id: req.params.id
            }
        });

        const updatedTodo = await Todo.findOne({where: { id: req.params.id }, raw:true});
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
            user_id: req.user.id,
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