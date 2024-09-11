import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSender } from "../redux/newEvent";

const LecturerCourses = (props) => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const sender = useSelector((state) => state.newEvent.sender);

  useEffect(() => {
    console.log(props, props.lecturer);
    const sendReq = async () => {
      try {
        let url = "https://school-backend-n4tv.onrender.com/lecturer/courses";
        let lecturer = props.user;
        const response = await axios.post(url, { lecturer });
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          localStorage.token = response.data.token;
<<<<<<< HEAD
          window.alert("found");
=======
          window.alert("found")
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
          console.log(response.data, "message");
          setEvents(response.data.courses);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    sendReq();
  }, [props.lecturer, props.AdminqrCode]);

  useEffect(() => {
    let countertoken = localStorage.Countertoken;
    if (countertoken) {
      if (!sender.length) {
        dispatch(setSender(props.user));
      }
    } else {
      console.log("err");
    }
  }, [dispatch, props.user, sender]);
  return (
    <div className="showEvent">
      <div className="coc">
<<<<<<< HEAD
        <div className="container text-center mx-auto med">
          <div className="text-center text-light bg-success p-1 fw-bold">
            <h3 className="fw-bold">All Courses</h3>
          </div>
          <div className="text-success">
            {events.length > 0 ? (
              events.map((eachEvent) => (
                <>
                  <div className="coco">
                    <ul
                      className="text-success mx-auto mb-5"
                      key={eachEvent.courseId}
                    >
                      <li>
                        <Link
                          className="listing"
                          onClick={() => dispatch(setSender(props.user))}
                          to={`/lecturer/${eachEvent.courseId}`}
                          key={eachEvent.courseId}
                        >
                          {console.log(events, eachEvent.courseId)}
                          <p>Course Title: {eachEvent.courseName}</p>
                          <p>Course Code: {eachEvent.courseCode}</p>
                          <p>Course Details: {eachEvent.courseDetails}</p>
                          <p>
                            Lcturer: {eachEvent.assignedLecturer1},{" "}
                            {eachEvent.assignedLecturer2}
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ))
            ) : (
              <div className="coc">
                <p>No events found...</p>
              </div>
            )}
          </div>
=======
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="fw-bold">All Courses</h3>
        </div>
        <div className="text-success">
          {events.length > 0 ? (
            events.map((eachEvent) => (
              <>
                <div className="coco">
                  <ul
                    className="text-success mx-auto mb-5"
                    key={eachEvent.courseId}
                  >
                    <li>
                      <Link
                        className="listing"
                        onClick={() => dispatch(setSender(props.user))}
                        to={`/lecturer/${eachEvent.courseId}`}
                        key={eachEvent.courseId}
                      >
                        {console.log(events, eachEvent.courseId)}
                        <p>Course Title: {eachEvent.courseName}</p>
                        <p>Course Code: {eachEvent.courseCode}</p>
                        <p>Course Details: {eachEvent.courseDetails}</p>
                        <p>
                          Lcturer: {eachEvent.assignedLecturer1},{" "}
                          {eachEvent.assignedLecturer2}
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ))
          ) : (
            <div className="coc">
              <p>No events found...</p>
            </div>
          )}
>>>>>>> b00b73cf63847654a19e0002b250de6149f8932a
        </div>
      </div>
    </div>
  );
};

export default LecturerCourses;
