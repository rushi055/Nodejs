import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BaseURL } from "../utils/const";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstname, setFirstName] = useState(user.firstname);
  const [gender, setGender] = useState(user.gender);
  const [photoURL, getPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const SaveProfie = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BaseURL + "/profile/edit",
        {
          firstname,
          photoURL,
          age,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error("Error updating profile:", err.message);
      setError(err?.response?.data || "Invalid Credentials");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className="flex justify-center mx-10  ">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile </h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo</legend>
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => getPhotoURL(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
              </div>

              <p className="text-sm text-red-500">{error}</p>
              <div className="card-actions justify-center my-10">
                <button className="btn btn-primary" onClick={SaveProfie}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={{ firstname, photoURL, age, gender }} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
