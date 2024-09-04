import React from "react";
// import img from ""
import img13 from "../../multimedia/Designer(7).jpeg";
import img12 from "../../multimedia/scanqr_2.jpeg";
import img10 from "../../multimedia/Exam(1).jpeg";
import img6 from "../../multimedia/Designer(3).jpeg";
import "../Admin/adminbody.css";

const StudentsBody = (props) => {
  return (
    <>
      {/* <div> */}
      <div className="heroe">
        <div className="container d-flex">
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
            <div class="tag">Lecture</div>
            <h5 class="">Start Class</h5>
            <p>
              Start class and share course Qr-Code to take students attendance.
              End class to stop taking attendance
            </p>
            <hr />
            <div class="author">
              <button className="btn btn-success mx-3">Start Class</button>
            </div>
          </div>
          <div class="box0">
            <img src={img6} alt="" />
            <div class="tag p-2">Records</div>
            <h5>View Attendance Records</h5>
            <p>
              View attendace records of all your students for a particular date
              or class, or view total attendace records
            </p>
            <hr />
            <div class="author d-flex">
              <button className="btn btn-success mx-3">View Records</button>
            </div>
          </div>
          <div class="box0">
            <img src={img10} alt="" />
            <div class="tag">Grades</div>
            <h5>Add Students Grades</h5>
            <p>
              Add students grades for your course. Grades are safely stored for
              future purpose. View all students grades
            </p>
            <hr />
            <div class="author d-flex">
              <button className="btn btn-success mx-3">View Grades</button>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="heroes">
        <div className="container d-flex mt-1">
          <div className="enroll mx-5 mt-5">
            <h1>Easy Attendance And Record Tracking</h1>
            <p>
              Easy attendance marking using Qr-Code. Safe and secure records
              keeping. View lecturers details, student details and performance
              and course allocation
            </p>
          </div>
          <div className="simplify">
            <img src={img14} alt="" />
          </div>
        </div>
        <div class="blog-grid">
          <div class="box0">
            <img src={img12} alt="" />
            <div class="tag">Lecturer</div>
            <h5 class="">View All Lecturers</h5>
            <p>
              View all lecturers registered. View lecturers details, course they
              are assigned to and attendace records
            </p>
            <hr />
            <div class="author">
              <button className="btn btn-success mx-3">View Lecturer</button>
            </div>
          </div>
          <div class="box0">
            <img src={img6} alt="" />
            <div class="tag p-2">Students</div>
            <h5>View All Students</h5>
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
      </section> */}
      {/* </div> */}
    </>
  );
};

export default StudentsBody;
