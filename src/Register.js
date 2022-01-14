import {useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./API/axios";

const NAME_REGEX = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState(""); 
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // });

  //fullname
  useEffect(() => {
    const result = NAME_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  //email
   useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  //username
  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidUsername(result);
  }, [username]);

  //password and confirm password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    // const v1 = USER_REGEX.test(user);
    // const v2 = PWD_REGEX.test(pwd);
    // if (!v1 || v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  }

  return (
    <>
    {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#" className = "link-light">Log In</a>
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* full name */}
          <label htmlFor="fullname">
            Full Name:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="fullname"
            autoComplete="off"
            // ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="form-control"
          />
        </div>
        <p
          id="uidnote"
          className={userFocus && !validName ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          The first name should contain only letters and of length 3 or more
          <br />
          The first name should contain only letters and of length 3 or more
          <br />
          The second name should contain only letters of length 3 or more and
          can be followed by other names or not
        </p>

        {/* email */}
        <div className="form-group">
          <label htmlFor="email">
            Email:
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emaildnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="form-control"
          />
        </div>

        <p
          id="emaildnote"
          className={emailFocus && !validEmail ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Letters, numbers, underscores, hyphens allowed.
          <br />
          Must have @ symbol
        </p>

        {/* username */}
        <div className="form-group">
          <label htmlFor="username">
            Username:
            <span className={validUsername ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validUsername || !username ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="fullname"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-invalid={validUsername ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
            className="form-control"
          />
        </div>

        <p
          id="uidnote"
          className={
            usernameFocus && !validUsername ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* password */}
        <div className="form-group">
          <label htmlFor="username">
            Password:
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="form-control"
          />
        </div>

        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters
        </p>

        {/* confirm password */}
        <div className="form-group">
          <label htmlFor="confirm_pwd">
            Confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="form-control"
          />
        </div>

        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field
        </p>

        <div className="form-group mt-3">
          <button
            className="btn btn-dark col-12"
            disabled={
              !validName ||
              !validEmail ||
              !validUsername ||
              !validPwd ||
              !validMatch
                ? true
                : false
            }
          >
            Register
          </button>
        </div>
      </form>

      <p className="text-white">
        Already registered?
        <br />
        <span className="link">
          {/*put router link here*/}
          <a href="#" className="link-light">
            Log In
          </a>
        </span>
      </p>
    </section>
        )}
  </>
  );
}

export default Register




