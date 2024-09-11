import axios from "axios";
import React, { useEffect, useState } from "react";

const StartCount = (props) => {
  const [scanResults, setScanResults] = useState([]);
  const [admin, setAdmin] = useState("");
  const [foundEvent, setFoundEvent] = useState([]);
  const [foundAdmin, setFoundAdmin] = useState([]);

  useEffect(() => {
    let url = "https://school-backend-n4tv.onrender.com/counter/countevent";
  }, [foundAdmin, admin]);

  const sendReq = async (result) => {
    try {
      let url = "https://school-backend-n4tv.onrender.com/counter/countevent";
      let scannedAdmin = result;
      let user = props.userName;
      axios.post(url, { scannedAdmin, user }).then((response) => {
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          console.log(response.data.events, "message");
          setFoundAdmin(response.data.events);
          setAdmin(response.data.events);
          console.log(
            response.data.status,
            response.data.message,
            response.data.users
          );
          console.log(foundAdmin, "found admin here", admin, scanResults);
        }
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const saveAdmin = async (counter) => {
    if (foundAdmin.length > 0) {
      let admin = foundAdmin[0].admin;
      let eventId = foundAdmin[0].eventId;
      let eventName = foundAdmin[0].eventName;
      let setDate = foundAdmin[0].setDate;
      let addRow = foundAdmin[0].addRow;
      let uniqueId = foundAdmin[0].uniqueId;
      let qrCode = foundAdmin[0].qrCode;
      let prevCounter = foundAdmin[0].counter;
      let newCounter = props.userName;
      let counter = [...prevCounter, newCounter];
      console.log(
        admin,
        eventId,
        eventName,
        setDate,
        addRow,
        uniqueId,
        prevCounter,
        newCounter,
        counter
      );
      try {
        let url = "https://school-backend-n4tv.onrender.com/counter/update";

        await axios
          .post(url, {
            admin,
            eventId,
            eventName,
            setDate,
            addRow,
            uniqueId,
            counter,
            qrCode,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status) {
              const foundEvent = Object.entries(response.data.form);
              setFoundEvent(foundEvent);
              console.log(foundEvent, "foundEvent oo");
              console.log("hello", response.data.status, response.data.form);
            } else {
              console.log(response.data.message);
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No users found in foundAdmin");
    }
  };

  return (
    <>
      <div className="create-two">
        <div className="container text-center mx-auto med">
          <div className="container-two col-5 col-sm-4 mx-auto p-3 mt-5">
            <div className="text-center text-success fw-bold">
              <h3 className="fw-bold">Scan Event</h3>
            </div>
            <div className="mt-5">
              {foundAdmin.map((scanResult, index) => (
                <div key={index} className="mt-3">
                  <h2 className="text-success">Counter {index + 1}</h2>
                  <div>
                    {scanResult ? (
                      <ul>
                        <li>
                          <p>Event Name: {foundAdmin[0].eventName}</p>
                        </li>
                        <li>
                          <p>Date: {foundAdmin[0].setDate}</p>
                        </li>
                        <li>
                          <p>Rows: {foundAdmin[0].addRow}</p>
                        </li>
                        <li>
                          <p>Event Id: {foundAdmin[0].eventId}</p>
                        </li>
                        <li>
                          <p>Admin: {foundAdmin[0].admin}</p>
                        </li>
                      </ul>
                    ) : (
                      <div>Error scanning user</div>
                    )}
                  </div>
                </div>
              ))}
              <div id="reader">Scan QR Code</div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartCount;
