import React, { useContext } from "react";
import { StateContext } from "./Contexts";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <p>
        Logged In As: <b>{user.username}</b>
      </p>
      <input type="submit" value="Log Out" />
    </form>
  );
}
