import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
// import "./addCourse.css";
=======
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
import {
  addCourse,
  addLecturer,
  addStudent,
  profile,
  viewCourses,
  viewLecturers,
  viewStudents,
} from "../redux/newEvent";

const style = {
  width: "250px",
};

const AdminMenu = () => {
  const dispatch = useDispatch();
  const [create, setcreate] = useState(false);

  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent);

  return (
    <>
      <div className="admin">
        <div className=" d-flex text-success">
          <a className="loginstyle" href="/">
            <i
<<<<<<< HEAD
              class="fa-solid fa-house fa-2xl mx-2 my-2 icons"
=======
              class="fa-solid fa-house fa-2xl mx-2 my-2 "
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold">Home</h5>
          </a>
        </div>
        <div
          className="mt-5 d-flex loginstyle"
          onClick={() => dispatch(profile())}
        >
          <i
<<<<<<< HEAD
            class="fa-solid fa-user fa-2xl mx-2 my-2 icons"
=======
            class="fa-solid fa-user fa-2xl mx-2 my-2"
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">Profile</h5>
        </div>
        <div
          onClick={() => dispatch(addCourse())}
          className="mt-5 d-flex loginstyle"
        >
          <i
<<<<<<< HEAD
            class="fa-solid fa-book fa-2xl mx-2 my-2 icons"
=======
            class="fa-solid fa-book fa-2xl mx-2 my-2"
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">Add Course</h5>
        </div>
        <div
          onClick={() => dispatch(addLecturer())}
          className="mt-5 d-flex loginstyle"
        >
          <i
<<<<<<< HEAD
            class="fa-solid fa-user-tie fa-2xl mx-2 my-2 icons"
=======
            class="fa-solid fa-user-tie fa-2xl mx-2 my-2"
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">Add Lecturer</h5>
        </div>
        <div
          className="mt-5 d-flex loginstyle"
          onClick={() => dispatch(addStudent())}
        >
          <i
<<<<<<< HEAD
            class="fa-solid fa-person fa-2xl mx-2 my-2 icons"
=======
            class="fa-solid fa-person fa-2xl mx-2 my-2"
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">Add Students</h5>
        </div>
        <div
          onClick={() => dispatch(viewCourses())}
          className="mt-5 d-flex loginstyle"
        >
          <i
<<<<<<< HEAD
            class="fa-solid fa-eye fa-2xl mx-2 my-2 icons"
=======
            class="fa-solid fa-eye fa-2xl mx-2 my-2"
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">View Courses</h5>
        </div>
        <div
          className="mt-5 d-flex loginstyle"
          onClick={() => dispatch(viewStudents())}
        >
          <i
<<<<<<< HEAD
            class="fa-solid fa-people-group fa-2xl mx-2 my-2 icons"
=======
            class="fa-solid fa-people-group fa-2xl mx-2 my-2"
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">All Students</h5>
        </div>
        <div
          className="mt-5 d-flex loginstyle"
          onClick={() => dispatch(viewLecturers())}
        >
          <i
<<<<<<< HEAD
            class="fa-solid fa-users fa-2xl mx-2 my-2 icons"
=======
            class="fa-solid fa-users fa-2xl mx-2 my-2"
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">All Lecturers</h5>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
