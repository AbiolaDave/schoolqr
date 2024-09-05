import React from "react";
import "./adminbody.css";
// import img from ""
import img12 from "../../multimedia/Lecturer_2.jpeg";
import img10 from "../../multimedia/books.jpeg";
import img6 from "../../multimedia/college_students_2.jpeg";
import img14 from "../../multimedia/scanqr.jpeg";
import img13 from "../../multimedia/video-for-event-marketing.jpg";

const AdminBody = (props) => {
  return (
    <>
      {/* <div> */}
      <div className="heroe">
        <div className="container d-flex cov">
          <div className="simplified">
            <img src={img13} alt="" />
          </div>
          <div className="enroll mx-5 mt-5">
            <h1>Simplified Enrollment Process </h1>
            <p>
              Enrolling students and managing courses has never been easier. Our
              portal simplifies the entire process, making it quick and
              straightforward for both lecturers and students. Spend less time
              on administration and more on teaching and learning.
            </p>
          </div>
        </div>
        <div class="blog-grid">
          <div class="box0">
            <img src={img12} alt="" />
            <div class="tag">Lecturer</div>
            <h5 class="">Register Lecturers</h5>
            <p>
              Register Lecturers easily. Monitor lecturers activities, class
              attendance and lecture records
            </p>
            <hr />
            <div class="author">
              <button className="btn btn-success mx-3">Add Lecturer</button>
            </div>
          </div>
          <div class="box0">
            <img src={img6} alt="" />
            <div class="tag p-2">Students</div>
            <h5>Register Students</h5>
            <p>
              Register students easily. Monitor students activities, attendace
              records and performance records
            </p>
            <hr />
            <div class="author d-flex">
              <button className="btn btn-success mx-3">Add Students</button>
            </div>
          </div>
          <div class="box0">
            <img src={img10} alt="" />
            <div class="tag">Course</div>
            <h5>Add Courses</h5>
            <p>
              Add courses available to lecturers and students. Keep track with
              number of students offering each course
            </p>
            <hr />
            <div class="author d-flex">
              <button className="btn btn-success mx-3">Add Courses</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBody;
