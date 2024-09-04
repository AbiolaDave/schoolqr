import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  profile,
  viewCourses,
  viewLecturers,
  viewStudents,
} from "../redux/newEvent";

const style = {
  width: "250px",
};

const StudentsMenu = () => {
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
              class="fa-solid fa-house fa-2xl mx-2 my-2 "
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
            class="fa-solid fa-user fa-2xl mx-2 my-2"
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">Profile</h5>
        </div>
        {/* <div
          onClick={() => dispatch(addCourse())}
          className="mt-5 d-flex loginstyle"
        >
          <i
            class="fa-solid fa-clipboard-user fa-2xl mx-2 my-2"
            style={{ color: "green" }}
          ></i>

          <h5 className="fw-bold">View Attendance</h5>
        </div> */}
        <div
          onClick={() => dispatch(viewCourses())}
          className="mt-5 d-flex loginstyle"
        >
          <i
            class="fa-solid fa-eye fa-2xl mx-2 my-2"
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">View Courses</h5>
        </div>
        <div
          className="mt-5 d-flex loginstyle"
          onClick={() => dispatch(viewStudents())}
        >
          <i
            class="fa-solid fa-book fa-2xl mx-2 my-2"
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">Select Course</h5>
        </div>
        <div
          className="mt-5 d-flex loginstyle"
          onClick={() => dispatch(viewLecturers())}
        >
          <i
            class="fa-solid fa-graduation-cap fa-2xl mx-2 my-2"
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold">Mark Attendance</h5>
        </div>
      </div>
    </>
  );
};

export default StudentsMenu;
