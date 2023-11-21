import React, { useContext } from "react";
import { StateContext } from "./Contexts";
import Todo from "./Todo";

export default function TodoList({ posts = [] }) {
  return (
    <div className="container">
      {posts.length === 0 && <h2 className="text-center">No todos found.</h2>}
      {posts.length > 0 && (
        <div>
          <h1>ToDo List</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">ToDo Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date Created</th>
                <th scope="col">Date Completed</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <Todo key={p.id} {...p} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
