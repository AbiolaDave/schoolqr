import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EventsCountCoordinator = (admin) => {
  let totalMale;
  let totalFemale;
  let totalBikes;
  let totalChildren;
  let totalFirstTimers;
  let totalVehicles;
  let uniqueId;
  let coordinator;

  const sender = useSelector((state) => state.newEvent.sender);
  console.log(sender);
  const dispatch = useDispatch();

  const [event, setEvent] = useState(null);
  const [eventCounter, setEventCounter] = useState([]);
  const [startButton, setstartButton] = useState(false);
  const [count, setcount] = useState([]);
  const [rowCount, setrowCount] = useState("");
  const [Admin, setAdmin] = useState("");
  const [accept, setaccept] = useState([]);
  const [acceptedCounts, setAcceptedCounts] = useState([]);
  const [rejectedCounts, setRejectedCounts] = useState([]);
  const [decline, setDecline] = useState(false);
  const [user, setUser] = useState("");
  const { eventId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5007/countcoordinator/countcoordinator/${eventId}`
        );
        setEvent(response.data);
        // findcount()
        setaccept(new Array(response.data.count.length).fill(false));
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId, rejectedCounts]);

  const submitCount = async () => {
    let url = "http://localhost:5007/countcoordinator/submit";
    let submittedCount = {
      totalMale,
      totalFemale,
      totalChildren,
      totalVehicles,
      totalBikes,
      totalFirstTimers,
      uniqueId,
      coordinator,
    };
    console.log(submittedCount);
    axios.post(url, { submittedCount }).then((response) => {
      console.log(response);
      if (response.data.status) {
        console.log(response.data, "something here");
      } else {
        console.log(response.data.message, "nothing here");
      }
    });
  };

  return (
    <div className="showEvent">
      <div className="text-center text-light bg-success p-1 fw-bold">
        <h3 className="mt-2">EVENT</h3>
      </div>
      {event ? (
        <div className="text-center mt-5 mb-5">
          <h2>{event.courseName}</h2>
          <p>Date: {event.courseCode}</p>
          <p>Rows: {event.courseDetails}</p>
          <p>Event ID: {event.eventId}</p>
          <p>Unique ID: {(uniqueId = event.uniqueId)}</p>
          <p>Count Coordinator: {(coordinator = event.countCoordinator)}</p>
          <p>Counter: {event.counter}</p>
        </div>
      ) : (
        <div>Loading event details...</div>
      )}
    </div>
  );
};

export default EventsCountCoordinator;
