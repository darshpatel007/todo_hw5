import React, { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";
import UserBar from "./UserBar";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import appReducer from "./reducers";
import { StateContext } from "./Contexts";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
  });

  const { user, posts } = state;

  const [postsResponse, getPosts] = useResource(() => ({
    url: `/todo/fetch`,
    method: "post",
    headers: { Authorization: `${state?.user?.access_token}` },
    data: {
      username: `${state?.user?.username}`,
    },
  }));

  useEffect(() => {
    getPosts();
    console.log(user._id);
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (
      postsResponse &&
      postsResponse.isLoading === false &&
      postsResponse.data
    ) {
      dispatch({
        type: "FETCH_POSTS",
        posts: postsResponse.data.todos.reverse(),
      });
    }
  }, [postsResponse]);

  useEffect(() => {
    if (user.access_token) {
      document.title = `${user.username}’s To-Do`;
    } else {
      document.title = "Todo-App";
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <br />
        <h1 className="text-center">Todo App</h1>
        <br />
        <UserBar />

        <br />
        <br />
        <hr />
        <br />
        {user.access_token && <CreateTodo />}
        {user.access_token && <TodoList posts={posts} />}
      </StateContext.Provider>
    </div>
  );
}

export default App;
