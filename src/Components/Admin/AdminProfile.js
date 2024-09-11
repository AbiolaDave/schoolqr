import axios from "axios";
import React, { useEffect, useState } from "react";
import "./adminProfile.css";

const AdminProfile = (props) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [user, setuser] = useState("");

  let url = "https://school-backend-n4tv.onrender.com/admin/adminpage";
  let Admintoken = localStorage.Admintoken;

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Admintoken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (!response.data.status) {
          console.log(response.data, "here error");
          // navigate("/login");
        } else {
          setuser(response.data.user);
          // setadmin(response.data.admin);
          // setAdminqrCode(response.data.AdminqrCode);
          console.log(user, "one to many");
          // dispatch(resetPage());
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // navigate("/login");
      });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {/* <MainNavbar /> */}
      <div>
        <div className="profile-pics">
          <img
            src={`https://school-backend-n4tv.onrender.com/${user.profile_picture}`}
            alt="Profile"
          />
        </div>
        <div className="profile-name">
          <h4>{user.firstname + " " + user.lastname}</h4>
        </div>
        <div className="profile-details">
          <h5>Firstname: {user.firstname}</h5>
          <h5>Lastname: {user.lastname}</h5>
          <h5>Middlename:{user.middlename}</h5>
          <h5>Email: {user.email}</h5>
          <h5>Home Address: {user.address}</h5>
          <h5>Phone Number: {user.phone_no}</h5>
          <h5>Gender: {user.gender}</h5>
          <h5>Username: {user.userName}</h5>
          <h5>Relationship Status: {user.relationship_status}</h5>
          {/* <p>pics : {user.profile_picture}</p> */}
        </div>
      </div>
    </>
  );
};

export default AdminProfile;