function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        access_token: action.access_token,
        username: action.username,
      };
    case "LOGOUT":
      return {
        access_token: "",
        username: "",
      };
    default:
      return state;
  }
}

function postReducer(state, action) {
  const posts = state;
  console.log(posts);
  switch (action.type) {
    case "CREATE_POST":
      const newPost = {
        _id: action._id,
        title: action.title,
        description: action.description,
        author: action.author,
        createdOn: action.createdOn,
        complete: action.complete,
        completedOn: action.completedOn,
      };
      return [newPost, ...state];

    case "TOGGLE_TODO":
      let updatedTodos = [];
      posts.forEach((todo) => {
        if (action._id === todo._id) {
          updatedTodos.push({
            ...todo,
            complete: action.complete,
            completedOn: action.complete ? new Date().toLocaleString() : null,
          });
        } else {
          updatedTodos.push(todo);
        }
      });
      return updatedTodos;

    case "FETCH_POSTS":
      return action.posts;
    case "DELETE_TODO":
      return posts.filter((todo) => todo._id !== action._id);

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    posts: postReducer(state.posts, action),
  };
}
