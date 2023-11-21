const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Todo = require("../models/Todo");
const privateKey = `
<PRIVATE_KEY_GOES_HERE>
`;
router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing" });
  }
});

router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    createdOn: new Date().toString(),
  });
  await todo
    .save()
    .then((savedtodo) => {
      return res.status(201).json({
        _id: savedtodo._id,
        title: savedtodo.title,
        description: savedtodo.description,
        author: savedtodo.author,
        createdOn: savedtodo.createdOn,
        complete: savedtodo.complete,
        completedOn: savedtodo.completedOn,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.post("/fetch", async function (req, res, next) {
  const user = await User.findOne()
    .where("username")
    .equals(req.body.username)
    .exec();

  if (user) {
    const todos = await Todo.find()
      .where("author")
      .equals(req.body.username)
      .exec();
    return res.status(200).json({ todos: todos });
  } else {
    console.log("No users to fetch posts.");
  }
});

router.delete("/:id/:username", async function (req, res) {
  Todo.findByIdAndDelete(req.params.id)
    .where("author")
    .equals(req.params.username)
    .then((todo) => {
      if (todo) {
        return res.status(200).json({
          id: todo._id,
          title: todo.title,
          description: todo.description,
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.put("/:id/:username", async function (req, res) {
  const my_todo = await Todo.find().where("_id").equals(req.params.id).exec();
  if (my_todo.length == 1) {
    Todo.findByIdAndUpdate(req.params.id, {
      complete: my_todo[0].complete ? false : true,
      completedOn:
        my_todo[0].completedOn === null ? new Date().toLocaleString() : null,
    })
      .where("author")
      .equals(req.params.username)
      .then((todo) => {
        if (todo) {
          return res.status(200).json({
            id: todo._id,
            title: todo.title,
            description: todo.description,
            author: todo.author,
            createdOn: todo.createdOn,
            complete: todo.complete,
            completedOn: todo.completedOn,
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  } else {
    return "Error! No record found";
  }
});

module.exports = router;
