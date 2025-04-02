import React from "react";
import NavBar from "./Navbar";
import { Outlet , useNavigate} from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BaseURL } from "../utils/const";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import Feed from "./Feed";
const Body = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(BaseURL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      return res.data;
    } catch (err) {
      if (err.status === 401) {
        navigator("/login");
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <NavBar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Body;
