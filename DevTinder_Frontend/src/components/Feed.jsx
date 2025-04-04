import axios from "axios";
import { BaseURL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BaseURL + "/feed", {
        withCredentials: true,
      });
      console.log(res?.data);
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div class="flex flex-col items-center justify-center mt-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;