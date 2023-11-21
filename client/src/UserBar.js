import { useContext } from "react";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "./Contexts";
export default function UserBar() {
  const { state, dispatch: dispatchUser } = useContext(StateContext);
  const { user } = state;

  if (user.access_token) {
    return <Logout />;
  } else {
    return (
      <>
        <Register dispatchUser={dispatchUser} />
        <Login dispatchUser={dispatchUser} />
      </>
    );
  }
}
