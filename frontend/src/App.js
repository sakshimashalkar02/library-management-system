import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Book from "./Librarian/Book";
import BookCreate from "./Librarian/BookCreate";
import BookUpdate from "./Librarian/BookUpdate";
import Student from "./Librarian/Student";
import StudentCreate from "./Librarian/StudentCreate";
import StudentUpdate from "./Librarian/StudentUpdate";
import IssuedBook from "./Librarian/IssuedBook";
import IssuedBookCreate from "./Librarian/IssuedBookCreate";
import IssuedBookUpdate from "./Librarian/IssuedBookUpdate";
import Profile from "./Profile";

function App() {
  return (
    <>
      <Router  future={{ v7_relativeSplatPath: true }}>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}>
            {" "}
          </Route>
          <Route path="/librarian-panel/book" element={<Book></Book>}></Route>
          <Route
            path="/librarian-panel/book-create"
            element={<BookCreate></BookCreate>}
          ></Route>
          <Route
            path="/librarian-panel/book-update/:id"
            element={<BookUpdate></BookUpdate>}
          ></Route>
          <Route
            path="/librarian-panel/student"
            element={<Student></Student>}
          ></Route>
          <Route
            path="/librarian-panel/student-create"
            element={<StudentCreate></StudentCreate>}
          ></Route>
          <Route
            path="/librarian-panel/student-update"
            element={<StudentUpdate></StudentUpdate>}
          ></Route>
          <Route path="/librarian-panel/issued-book" element={<IssuedBook />} />
          <Route
            path="/librarian-panel/issued-book-create"
            element={<IssuedBookCreate />}
          />
          <Route
            path="/librarian-panel/issued-book-update/:id"
            element={<IssuedBookUpdate />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
