import React from "react";
import Navbar from "./Navbar";
const ChooseRegistration = () => {
  return (
    <>
      <Navbar />
      <div className="backg d-flex justify-content-center align-items-center">
        <div className="mt-5 container">
          <div className="reg col-3 col-sm-5 mx-auto p-3 border rounded-2 mt-5 mb-5 con-box">
            <div className="mt-5 d-flex text-center mx-auto text-success ">
              <a className="loginstyle mx-auto" href="/adminlogin">
                <i
                  class="fa-solid fa-right-to-bracket fa-2xl mx-2 my-3"
                  style={{ color: "green" }}
                ></i>
                <h5 className="fw-bold">Admin LogIn</h5>
              </a>
            </div>
            <div className="mt-5 d-flex text-center mx-auto text-success ">
              <a className="loginstyle mx-auto" href="/lecturerlogin">
                <i
                  class="fa-solid fa-right-to-bracket fa-2xl mx-2 my-3"
                  style={{ color: "green" }}
                ></i>
                <h5 className="fw-bold">Lecturer LogIn</h5>
              </a>
            </div>
            <div className="mt-5 mb-5 d-flex text-center mx-auto text-success ">
              <a className="loginstyle mx-auto" href="/studentlogin">
                <i
                  class="fa-solid fa-right-to-bracket fa-2xl mx-2 my-3"
                  style={{ color: "green" }}
                ></i>
                <h5 className="fw-bold">Student LogIn</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseRegistration;
