import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";

export default function Login({ dispatchUser }) {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  const [user, login] = useResource((username, password) => ({
    url: "/auth/login",
    method: "post",
    data: { username, password },
  }));

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        dispatchUser({
          type: "LOGIN",
          username: username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="container">
      <hr></hr>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // setUser(username);
          login(username, password);
          //dispatchUser({ type: "LOGIN", username });
        }}
      >
        {loginFailed && (
          <span style={{ color: "red" }}>Invalid username or password</span>
        )}

        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="login-username"
                id="login-username"
                value={username}
                onChange={handleUsername}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="login-password"
                id="login-password"
                value={password}
                onChange={handlePassword}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-3">
            <br />
            <input type="submit" value="Login" className="mt-2" />
            <br></br>
          </div>
        </div>
      </form>
    </div>
  );
}
