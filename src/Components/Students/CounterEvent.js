import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSender } from "../redux/newEvent";
import axios from "axios";

const CounterEvent = (props) => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const sender = useSelector((state) => state.newEvent.sender);
  console.log(sender);

  useEffect(() => {
    const sendReq = async () => {
      try {
        let url = "http://localhost:5007/counter/counterpage/events";
        let admin = props.admin;
        let AdminqrCode = props.AdminqrCode;
        axios.post(url, { admin, AdminqrCode }).then((response) => {
          if (!response.data.status) {
            console.log(response.data.message);
          } else {
            setEvents(response.data.events);
            console.log(AdminqrCode);
          }
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    sendReq();
  }, [props.admin, props.AdminqrCode]);

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
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="fw-bold">All Events</h3>
        </div>
        <div className="text-success">
          {events.length > 0 ? (
            events.map((eachEvent) => (
              <ul className="text-success" key={eachEvent.eventId}>
                <li>
                  <Link
                    onClick={() => dispatch(setSender(props.user))}
                    to={`/counterpage/${eachEvent.eventId}`}
                    key={eachEvent.eventId}
                  >
                    <p>Date: {eachEvent.setDate}</p>
                    <p>Name: {eachEvent.eventName}</p>
                    <p>Rows: {eachEvent.addRow}</p>
                    <p>Event ID: {eachEvent.eventId}</p>
                    <p>Unique ID: {eachEvent.uniqueId}</p>
                    <p>Admin: {eachEvent.admin}</p>
                    <img src={props.AdminqrCode} alt="" />
                  </Link>
                </li>
              </ul>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounterEvent;
