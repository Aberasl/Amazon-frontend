import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import classes from "./Signup.module.css";
import { auth } from "..//../Utilty/Firebase";

import { ClipLoader } from "react-spinners";
import { Type } from "../../Utilty/Action.type";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/Datapprovider/DataProvider";

function Auth() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navStateData=useLocation();
  console.log(navStateData)
 
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
 const [{user}, dispatch] = useContext(DataContext);
 console.log(user)


  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name === "signin") {
      setLoading({
        ...loading,
        signin: true,
      });
      // firebaseauth
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({ type: Type.SET_USER, user: userinfo.user });
          setLoading({
            ...loading,
            signin: false,
          });
          navigate(navStateData?.state?.redirect ||"/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({
            ...loading,
            signin: false,
          });
        });
    } else {
      setLoading({
        ...loading,
        signup: true,
      });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({ type: Type.SET_USER, user: userinfo.user });
          setLoading({
            ...loading,
            signup: false,
          });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading({
        ...loading,
        signup: false,
      });
    }
  };

  return (
    <section className={classes.login}>
      <div className={classes.logoContainer}>
        <Link to="/">
          <img
            className={classes.logo}
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </Link>
      </div>

      <div className={classes.formContainer}>
        <h1 className={classes.heading}>Sign In</h1>
        {
          navStateData?.state?.message &&(
            <small
            style={
              
                {
                  padding:"5px",
                  textAlign:"center",
                  color:"red",
                  fontWeight:"bold",


                }
            }
            >
              {navStateData?.state?.message}


            </small>
  )

        }
        <form className={classes.form}>
          <label htmlFor="Email"> email</label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="email"
            id="email"
            className={classes.input}
          />
          <label htmlFor="password"> password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="password"
            className={classes.input}
          />
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.button}
          >
            {loading.signin ? <ClipLoader /> : "Sign in"}
          </button>
        </form>

        <p className={classes.signUpText}>
          New to Amazon? By signing up, you agree to the Amazon Clone Terms of
          Use and Sale. Please see our Privacy Notices.
        </p>

        {/* Signup Button */}

        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.signupButton}
        >
          {loading.signup ? <ClipLoader /> : "Create your Amazon account"}
        </button>
        {error && (
          <small
            style={{
              color: "red",

              fontSize: "12px",

              paddingTop: "10px",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
