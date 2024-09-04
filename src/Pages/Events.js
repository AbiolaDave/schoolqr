import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCourse } from "../Components/redux/newEvent";

const Events = () => {
  let unique;
  let coord;

  const createNewEvent = useSelector((state) => state);
  const sender = useSelector((state) => state.newEvent.sender);
  const dispatch = useDispatch();
  const [event, setEvent] = useState(null);
  const [eventCounter, setEventCounter] = useState([]);
  const [startButton, setstartButton] = useState(false);
  const [rowCount, setrowCount] = useState("");
  const [Admin, setAdmin] = useState("");
  const [coordinator, setcoordinator] = useState("");
  const [addCounter, setaddCounter] = useState(false);
  const [scanQrCode, setscanQrCode] = useState(false);
  const [totalCount, settotalCount] = useState("");
  const [finalCount, setFinalCount] = useState(false);
  const [acceptedCounts, setAcceptedCounts] = useState([]);
  const [rejectedCounts, setRejectedCounts] = useState([]);
  const [decline, setDecline] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://school-backend-n4tv.onrender.com/admin/adminpage/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {}, []);

  useEffect(() => {
    checkEventDate();
    getFinalCount();
  }, [event]);

  const getFinalCount = async () => {
    if (event) {
      let url = "https://school-backend-n4tv.onrender.com/admin/getfinalcount";
      let unique = event.uniqueId;
      try {
        axios.post(url, { unique, coordinator }).then((response) => {
          if (response.data.status) {
            settotalCount(response.data.count);
            setFinalCount(true);
            setAcceptedCounts(response.data.count);
            console.log(response.data, "getting heree");
          } else {
            console.log(response.data, "getting ttheree");
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("errorrr");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Delete this event?");
      if (confirmDelete) {
        await axios.delete(`https://school-backend-n4tv.onrender.com/admin/adminpage/${eventId}`);
        alert("Event deleted successfully");
        navigate("/adminpage");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete the event. Please try again.");
    }
  };

  const downloadQRCode = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qrcode.png";
      link.click();
    });
  };

  const checkEventDate = async () => {
    if (event) {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let weekday = date.getDay();
      let year = date.getFullYear();

      const eventDate = new Date(event.setDate);
      const eventMonth = eventDate.getMonth() + 1;
      const eventDay = eventDate.getDate();
      const repeatedDay = eventDate.getDay();
      const eventYear = eventDate.getFullYear();

      console.log(eventDate, eventDay, repeatedDay);

      if (eventMonth === month && eventDay === day && eventYear === year) {
        setstartButton(true);
        setrowCount(event.addRow);
        setEventCounter(event.counter);
        setAdmin(event.admin);
        setcoordinator(event.countCoordinator);
        console.log(event.countCoordinator, coordinator);
        console.log("The event date is today! 00000000");
      } else if (repeatedDay === weekday && eventDay >= repeatedDay) {
        setstartButton(true);
        setrowCount(event.addRow);
        setEventCounter(event.counter);
        setAdmin(event.admin);
        setcoordinator(event.countCoordinator);
        console.log(event.countCoordinator, coordinator);
        console.log("The event date is today! oooooooo");
      } else {
      
        console.log("The event date is not today.");
      }
    }
  };

  const startEvent = async () => {
    if (window.confirm("Start event?")) {
      setaddCounter(true);
      dispatch(addCourse());
      console.log(rowCount);
      getTotalCount();
      // sendNot();
      // sendCoord();
    }
  };

  const acceptCount = async (totalCount) => {
    await setFinalCount(true);
    await setAcceptedCounts(totalCount);
    console.log(finalCount, acceptedCounts, "accept");
    let url = "https://school-backend-n4tv.onrender.com/admin/finalcount";
    try {
      axios.post(url, { totalCount }).then((response) => {
        if (response.data.status) {
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const rejectCount = async (totalCount) => {
    let confirmReject = window.confirm(
      "Are you sure you want to reject count?"
    );
    if (confirmReject) {
      await setDecline(true)
      await setRejectedCounts(totalCount);
      let url = "https://school-backend-n4tv.onrender.com/admin/rejectcount";
      try {
        axios.post(url, { totalCount }).then((response) => {
          if (response.data.status) {
            console.log(response.data);
          } else {
            console.log(response.data);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
 

  const showQr = async () => {
    setscanQrCode(true);
  };

  useEffect(() => {
    if (eventCounter) {
      console.log("Input value changed:", eventCounter);
      sendNot();
    }
  }, [eventCounter]);

  const getTotalCount = async () => {
    let url = "https://school-backend-n4tv.onrender.com/admin/totalcounts";
    let coord = event.countCoordinator;
    let unique = event.uniqueId;
    console.log(unique, coord, "sendinggggg");
    try {
      axios.post(url, { coordinator, unique }).then((response) => {
        if (response.data.status) {
          settotalCount(response.data.count);
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sendNot = async () => {
    let url = "https://school-backend-n4tv.onrender.com/admin/notification";
    let counter = await eventCounter;
    let admin = await Admin;
    try {
      await axios.post(url, { counter, admin }).then((response) => {
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          // localStorage.token = response.data.token;
          console.log(response.data.message, "message");
          //  setEvents(response.data.events);

          //  console.log(AdminqrCode);
        }
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (event) {
      console.log(
        "Input value changed for count coordinator:",
        event.countCoordinator
      );
      sendCoord();
    }
  }, [event]);

  const sendCoord = async () => {
    let url = "https://school-backend-n4tv.onrender.com/admin/coordnotification";
    let Coordinator = await coordinator;
    let admin = await Admin;
    try {
      await axios.post(url, { Coordinator, admin }).then((response) => {
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          // localStorage.token = response.data.token;
          console.log(response.data.message, "message");
          //  setEvents(response.data.events);

          //  console.log(AdminqrCode);
        }
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="showEvent">
      <div className="text-center text-light bg-success p-1 fw-bold">
        <h3 className="mt-2">EVENT</h3>
      </div>
      {event ? (
        <div className="text-center mt-5 mb-5">
          <h2>{event.eventName}</h2>
          <p>Date: {event.setDate}</p>
          <p>Rows: {event.addRow}</p>
          <p>Event ID: {event.eventId}</p>
          <p>Unique ID: {event.uniqueId}</p>
          <p>Count Coordinator: {event.countCoordinator}</p>
          <p>Counters: {event.counter}</p>
          <p>User: {sender}</p>

          {scanQrCode ? (
            <>
              <div className="mt-3 mb-3" ref={qrRef}>
                <QRCode
                  size={456}
                  style={{ height: "350px", maxWidth: "350px", width: "50%" }}
                  value={event.uniqueId}
                  id="qrCanvas"
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="text-center container col-4">
                <button
                  className="btn btn-success form-control mt-3 col-3"
                  onClick={downloadQRCode}
                >
                  Download QR Code
                </button>
              </div>
            </>
          ) : null}

          {totalCount ? (
            <div className="mt-5 mb-5">
              <p>Total Male: {totalCount.totalMale}</p>
              <p>Total Female: {totalCount.totalFemale}</p>
              <p>Total Children: {totalCount.totalChildren}</p>
              <p>Total Vehicle: {totalCount.totalVehicles}</p>
              <p>Total Bikes: {totalCount.totalBikes}</p>
              <p>Total First-Timers: {totalCount.totalFirstTimers}</p>
              <p>
                Total:{" "}
                {totalCount.totalMale +
                  totalCount.totalFemale +
                  totalCount.totalChildren}
              </p>

              {!finalCount ? (
                <>
                  <button
                    onClick={() => acceptCount(totalCount)}
                    className="btn btn-success mx-4"
                  >
                    Accept Count
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => rejectCount(totalCount)}
                  >
                    Reject Count
                  </button>
                </>
              ) :decline ? (
                <p>Count Rejected</p>
              ): (
                <>
                  <p>Count accepted</p>
                </>
              )}
            </div>
          ) : null}

          {addCounter ? (
            <div className="mt-3 mb-3">
              {eventCounter.map((each, index) => (
                <div key={index}>
                  <p>Counter: {each}</p>
                </div>
              ))}
            </div>
          ) : null}

          {addCounter ? (
            <div className="mt-3 mb-3">
              {Array.from({ length: rowCount }).map((_, index) => (
                <div className="mb-2" key={index}>
                  <input
                    type="text"
                    placeholder={`Input ${index + 1}`}
                    value={eventCounter[index] || ""}
                  />
                </div>
              ))}
              <button onClick={showQr}>Add Counter</button>
            </div>
          ) : null}

          {finalCount && acceptedCounts ? (
            <>
              <p>Total Male: {acceptedCounts.totalMale}</p>
              <p>Total Female: {acceptedCounts.totalFemale}</p>
              <p>Total Children: {acceptedCounts.totalChildren}</p>
              <p>Total Vehicle: {acceptedCounts.totalVehicles}</p>
              <p>Total Bikes: {acceptedCounts.totalBikes}</p>
              <p>Total First-Timers: {acceptedCounts.totalFirstTimers}</p>
              <p>
                Total:
                {acceptedCounts.totalMale +
                  acceptedCounts.totalFemale +
                  acceptedCounts.totalChildren}
              </p>
            </>
          ) : null}

          <button className="btn btn-success" onClick={handleDelete}>
            Delete
          </button>
          {startButton ? (
            <button className="btn btn-success mx-3" onClick={startEvent}>
              Start Event
            </button>
          ) : null}
        </div>
      ) : (
        <div className="showEvent">Loading event details...</div>
      )}
    </div>
  );
};

export default Events;
