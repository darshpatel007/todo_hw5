import React, { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

export default function Todo({
  _id,
  title,
  description,
  author,
  createdOn,
  complete,
  completedOn,
  __v,
}) {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todoUpdate, updateTodo] = useResource(
    ({ _id, complete, completedOn }) => ({
      url: `/todo/${_id}/${state.user.username}`,
      method: "put",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, description, createdOn, complete, completedOn },
    })
  );

  function handleUpdate() {
    const completedOn = new Date().toLocaleString();
    updateTodo({
      _id,
      title,
      description,
      complete: !complete,
      completedOn: complete ? null : completedOn,
    });
    dispatch({
      type: "TOGGLE_TODO",
      _id: _id,
      complete: !complete,
      completedOn: completedOn,
    });
  }

  const [todoDelete, deleteTodo] = useResource(({ _id }) => ({
    url: `/todo/${_id}/${state.user.username}`,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  function handleDelete() {
    deleteTodo({
      _id: _id,
    });
    dispatch({ type: "DELETE_TODO", _id: _id });
  }

  return (
    <tr>
      <td>
        <div>
          <input
            type="checkbox"
            checked={complete || false}
            onChange={handleUpdate}
          />
          <label htmlFor="complete" className="form-label">
            &nbsp;&nbsp;&nbsp;complete
          </label>
        </div>
      </td>

      <td>{title}</td>
      <td>{description}</td>
      <td>{new Date(createdOn).toLocaleString()}</td>
      <td>
        {completedOn ? new Date(completedOn).toLocaleString() : "Not Completed"}
      </td>
      <td>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
