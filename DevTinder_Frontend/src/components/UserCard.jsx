import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { firstname, email, age, photoURL, gender } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="Feed" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstname}</h2>
        {age && <p>Age : {age}</p>}
        {gender && <p>Gender : {gender}</p>}
        <p> Email : {email}</p>
        <div className="card-actions justify-end m-4">
        <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignored</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
