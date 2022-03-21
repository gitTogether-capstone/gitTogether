import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, signOut } from "../../store/user";
import { Link } from "react-router-dom";
import supabase from "../../client";
import "./navbar.scss";
import AddIcon from "@mui/icons-material/Add";
import Login from "../Login";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // o: is this being used?
  const checkUser = () => {
    const user = supabase.auth.user();
    dispatch(setUser(user));
  };

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div id="navBar">
      <div className="wrapper">
        <div id="leftNav">
          <Link to="/" className="logo">
            gitTogether
          </Link>
          <div className="itemContainer">
            <span>Browse Ideas</span>
          </div>
          <div className="itemContainer">
            <span>Messages</span>
          </div>
        </div>
        <div id="rightNav">
          <div className="itemContainer">
            <Link to="/addProject">
            <AddIcon className="icon" />
            </Link>
          </div>
          <div>
            {/* o: you can use optional chaning here... user?.id */}
            {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
            {user && user.id ? (
            <>
            <Link to="/me" className="profilePic">
              <img src={user.user_metadata.avatar_url} alt="profile" />
            </Link>
            <button
            className="logoutButton"
            onClick={logout}
            >Sign Out</button>
            </>
              ) : (
                <Link to="/login">
                <button className="loginButton">Login</button>
              </Link>
              )  }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
