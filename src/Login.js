import {useRef, useState, useEffect, useContext} from "react";
import AuthContext from './context/AuthProvider';
import axios from "./API/axios";
const LOGIN_URL = "/auth";

const Login = () => {
      const {setAuth} = useContext(AuthContext);
      const userRef = useRef();
      const errRef = useRef();

      const [user, setUser] = useState("");
      const [pwd, setPwd] = useState("");
      const [errMsg, setErrMsg] = useState("");
      const [success, setSuccess] = useState(false);

      useEffect(() => {
        userRef.current.focus();
      }, []);

      useEffect(() => {
        userRef.current.focus();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
      <>
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <a href="#">Go to Home</a>
            </p>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                {/* username */}
                <label htmlFor="fullname">Username:</label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-describedby="uidnote"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                {/* password */}
                <label htmlFor="fullname">Password:</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setUser(e.target.value)}
                  required
                //   value={pwd}
                  className="form-control"
                />
              </div>

              <div className="form-group mt-3">
                <button className="btn btn-dark col-12">Log In</button>
              </div>
            </form>
          </section>
        )}
      </>
    );
}

export default Login
