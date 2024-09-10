import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCourse from "../Components/Admin/AddCourse";
import AddLecturer from "../Components/Admin/AddLecturer";
import AddStudent from "../Components/Admin/AddStudent";
import AdminBody from "../Components/Admin/AdminBody";
import AdminMenu from "../Components/Admin/AdminMenu";
import AdminProfile from "../Components/Admin/AdminProfile";
import ViewCourses from "../Components/Admin/ViewCourses";
import ViewLecturers from "../Components/Admin/ViewLecturers";
import ViewStudents from "../Components/Admin/ViewStudents";
import FooterComp from "../Components/FooterComp";
import MainNavbar from "../Components/MainNavbar";
import { resetPage } from "../Components/redux/newEvent";
import "./adminPage.css";
// import "../Components/Admin/createEvents.css"

const AdminPage = () => {
  const dispatch = useDispatch();
  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent, "admin page");

  let Admintoken = localStorage.Admintoken;
  let navigate = useNavigate();
  let url = "https://school-backend-n4tv.onrender.com/admin/adminpage";

  const [user, setuser] = useState("");
  const [admin, setadmin] = useState("");
  const [AdminqrCode, setAdminqrCode] = useState("");

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
          console.log(response.data.status, "here error");
          navigate("/login");
        } else {
          setuser(response.data.firstname);
          setadmin(response.data.admin);
          console.log(response.data.firstname, response.data.admin);
          dispatch(resetPage());
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, []);
  let componentToDisplay;

  if (createNewEvent.newEvent.createEvent === "empty") {
    componentToDisplay = <AdminBody user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "profile") {
    componentToDisplay = <AdminProfile user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "addcourse") {
    componentToDisplay = (
      <AddCourse user={user} admin={admin} AdminqrCode={AdminqrCode} />
    );
  } else if (createNewEvent.newEvent.createEvent === "addlecturer") {
    componentToDisplay = <AddLecturer user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "addstudent") {
    componentToDisplay = <AddStudent user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewcourses") {
    componentToDisplay = <ViewCourses user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewlecturers") {
    componentToDisplay = <ViewLecturers user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewstudents") {
    componentToDisplay = <ViewStudents user={user} admin={admin} />;
  } else {
    componentToDisplay = <div></div>;
  }

  return (
    <>
      <MainNavbar />
      <div className="d-flex">
        <AdminMenu />
        <div>{componentToDisplay}</div>
      </div>
      <div className="">
        <FooterComp />
      </div>
    </>
  );
};

export default AdminPage;
