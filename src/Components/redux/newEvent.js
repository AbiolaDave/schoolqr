import { createSlice } from "@reduxjs/toolkit";

export const newEvent = createSlice({
  name: "event",
  initialState: {
    createEvent: "empty",
    sender: JSON.parse(localStorage.getItem("sender")) || [],
  },
  reducers: {
    startNewEvent: (state) => {
      state.createEvent = "main";
    },
    profile: (state) => {
      state.createEvent = "profile";
    },
    addCourse: (state) => {
      state.createEvent = "addcourse";
    },
    addLecturer: (state) => {
      state.createEvent = "addlecturer";
    },
    addStudent: (state) => {
      state.createEvent = "addstudent";
    },
    viewCourses: (state) => {
      state.createEvent = "viewcourses";
    },
    viewLecturers: (state) => {
      state.createEvent = "viewlecturers";
    },
    viewStudents: (state) => {
      state.createEvent = "viewstudents";
    },
    resetPage: (state) => {
      state.createEvent = "empty";
    },
    coordinateCount: (state) => {
      state.createEvent = "coordinatecount";
    },
    adminStart: (state) => {
      state.createEvent = "adminstart";
    },
    coordinatorStart: (state) => {
      state.createEvent = "coordinatorstart";
    },
    setSender: (state, action) => {
      state.sender = [action.payload];
      localStorage.setItem("sender", JSON.stringify(state.sender));
    },
  },
});

export const {
  startNewEvent,
  profile,
  addCourse,
  addLecturer,
  addStudent,
  viewCourses,
  viewLecturers,
  viewStudents,
  resetPage,
  setSender,
} = newEvent.actions;
export default newEvent.reducer;
