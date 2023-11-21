import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [post, createPost] = useResource(({ title, description, author }) => ({
    url: "/todo",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    data: { title, description, author },
  }));

  function handleTodoSubmit(e) {
    e.preventDefault();
    if (title.length === 0) {
      alert("Please enter todo name.");
      return;
    }

    console.log("s : " + state.user.username);
    let author = state.user.username;
    const newPost = { title, description, author };

    createPost(newPost);
    setTitle("");
    setDescription("");
  }

  useEffect(() => {
    console.log("un ;" + state.user.username);
    if (post.isLoading === false && post.data) {
      dispatch({
        type: "CREATE_POST",
        _id: post.data._id,
        title: post.data.title,
        description: post.data.description,
        author: post.data.author,
        createdOn: post.data.createdOn,
        complete: post.data.complete,
        completedOn: post.data.completedOn,
      });
    }
  }, [post]);

  function handleChangeTodoTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeTodoDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <div className="container">
      <h1>Add ToDo</h1>

      <div className="row">
        <form onSubmit={handleTodoSubmit}>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Todo Name</label>
              <input
                type="text"
                name="create-title"
                id="create-title"
                value={title}
                onChange={handleChangeTodoTitle}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="create-description">Description:</label>
              <textarea
                type="text"
                name="create-description"
                id="create-description"
                value={description}
                onChange={handleChangeTodoDescription}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <input type="submit" value="Create" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
