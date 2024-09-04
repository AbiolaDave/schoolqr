import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSender } from "../redux/newEvent";

const LecturerStudents = (props) => {
  const [events, setEvents] = useState([]);
  const [lecturers, setlecturers] = useState("");
  const dispatch = useDispatch();

  const sender = useSelector((state) => state.newEvent.sender);

  useEffect(() => {
    console.log(props, props.admin);
    const sendReq = async () => {
      try {
        let url = "http://localhost:5007/admin/adminpage/students";
        let lecturer = props.user;
        const response = await axios.post(url, { lecturer, AdminqrCode });
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          localStorage.token = response.data.token;
          console.log(response.data.message, "message");
          setEvents(response.data.student);
          console.log(AdminqrCode);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    sendReq();
  }, [props.admin, props.AdminqrCode]);

  useEffect(() => {
    let lecturerToken = localStorage.lecturerToken;
    if (lecturerToken) {
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
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="fw-bold">My Students</h3>
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
                        to={`/adminpage/${eachEvent.courseId}`}
                        key={eachEvent.courseId}
                      >
                        {console.log(events, eachEvent.courseId)}
                        <p>First Name: {eachEvent.firstname}</p>
                        <p>Last Name: {eachEvent.lastname}</p>
                        <p>Middle Name: {eachEvent.middlename}</p>
                        <p>Email: {eachEvent.email}</p>
                        <p>Gender: {eachEvent.gender}</p>
                        <p>Address: {eachEvent.address}</p>
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
      </div>
    </div>
  );
};

export default LecturerStudents;
