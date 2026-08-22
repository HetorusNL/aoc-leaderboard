import { Fragment, useContext, useEffect, useState } from "react";

import { AppContext } from "../context/context";
import { setLoading } from "../context/actions";
import { apiGetSessionToken, apiSetSessionToken } from "../utils/api";

const Admin = () => {
  const [currentSession, setCurrentSession] = useState(
    "loading current session token..."
  );
  const [submitResult, setSubmitResult] = useState("not submitted");
  const [token, setToken] = useState("");
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    getSessionToken();
  }, []);

  const getSessionToken = async () => {
    apiGetSessionToken().then((response) =>
      setCurrentSession(response.data.session)
    );
  };

  const submitSessionToken = async () => {
    try {
      dispatch(setLoading(true));
      // set the session token on the API
      setSubmitResult("submitting...");
      const response = await apiSetSessionToken(token);
      setSubmitResult(response.data.result);
      // after successfully setting the API token,
      // get the session token to show it to the user
      getSessionToken();
      dispatch(setLoading(false));
    } catch {
      setSubmitResult("failure");
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <h1>Admin page</h1>
      <p>
        Configure the admin properties on this page. This page is protected by
        SSO for 'normal' users.
      </p>
      <br />
      <p>
        <i>Current session token: {currentSession}</i>
      </p>
      <br />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitSessionToken();
          }}
          className="form"
        >
          <input
            type="text"
            name="session-token"
            placeholder="Session token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <input type="submit" value="Submit session token" className="btn" />
          Session token: {submitResult}
        </form>
      </div>
    </Fragment>
  );
};

export default Admin;
