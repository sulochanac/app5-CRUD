import React, { Component } from "react";
import axios from "axios";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        sname: "",
        fname: "",
        mname: "",
        phonenumber: "",
        email: "",
        gender: "",
        subjects: [],
      },

      isEdit: false,
      gIndex: 0,
      users: [],
    };
    // this.setState({ user: newperson });
  }
  handleChange = (e) => {
    console.log(e);
    var newperson = { ...this.state.user };
    if (e.target.name !== "subject") {
      newperson[e.target.name] = e.target.value;
    } else {
      if (newperson.subjects.indexOf(e.target.value) == -1) {
        newperson.subjects.push(e.target.value);
      } else {
        newperson.subjects = newperson.subjects.filter((subject) => {
          return subject !== e.target.value;
        });
      }
    }
    this.setState({ user: newperson });
  };
  updateUser = () => {
    axios
      .put("http://localhost:3000/users/" + this.state.user.id, this.state.user)
      .then((res) => {
        this.getAllUsers();
         this.clearForm();
      });
  };
  addUser = () => {
    axios.post("http://localhost:3000/users", this.state.user).then(() => {
      console.log("User Added Successfully");
       this.clearForm();
      this.getAllUsers();
      
    });
  };
  clearForm = () => {
    var newperson = {
      sname: "",
      fname: "",
      mname: "",
      phonenumber: "",
      email: "",
      gender: "",
      subjects: [],
    };
    this.setState({ user: newperson });
  };
  getAllUsers = () => {
    axios.get("http://localhost:3000/users").then((res) => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
  };
  handleEdit = (usr) => {
    this.setState({ user: usr, isEdit: true });
  };
  componentDidMount() {
    this.getAllUsers();
  }

  handleDelete = (usr) => {
    axios.delete("http://localhost:3000/users/" + usr.id).then(() => {
      this.getAllUsers();
    });
  };
  render() {
    var { sname, fname, mname, phonenumber, email, gender, subjects } =
      this.state.user;
    var { isEdit, users } = this.state;
    var { handleChange, updateUser, addUser, handleEdit, handleDelete } = this;
    return (
      <div>
        <h2>User Form</h2>
        <form>
          <label htmlFor="sname">Student Name</label>
          <input
            type="text"
            name="sname"
            value={sname}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="fname">Father Name</label>
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="mname">Mother Name</label>
          <input
            type="text"
            name="mname"
            value={mname}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            value={phonenumber}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Gender:</label>
          <br />
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender == "male"}
            onChange={handleChange}
          />
          <label htmlFor="male">Male</label>
          <br />
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender == "female"}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
          <br />
          <input
            type="radio"
            id="other"
            name="gender"
            checked={gender == "other"}
            onChange={handleChange}
          />
          <label htmlFor="other">Other</label>
          <br />
          <br />
          <label>Subjects:</label>
          <br />
          <input
            type="checkbox"
            id="math"
            name="subject"
            value="math"
            checked={subjects.indexOf("math") > -1}
            onChange={handleChange}
          />
          <label htmlFor="math">Math</label>
          <br />
          <input
            type="checkbox"
            id="science"
            name="subject"
            value="science"
            checked={subjects.indexOf("science") > -1}
            onChange={handleChange}
          />
          <label htmlFor="science">Science</label>
          <br />
          <input
            type="checkbox"
            id="history"
            name="subject"
            value="history"
            checked={subjects.indexOf("history") > -1}
            onChange={handleChange}
          />
          <label htmlFor="history">History</label>
          <br />
          <input
            type="checkbox"
            id="english"
            name="subject"
            value="english"
            checked={subjects.indexOf("english") > -1}
            onChange={handleChange}
          />
          <label htmlFor="english">English</label>
          <br />
          <br />
          {isEdit ? (
            <input type="button" value="Update" onClick={updateUser} />
          ) : (
            <input type="button" value="Submit" onClick={addUser} />
          )}
        </form>
        <hr />
        <table border={1}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Subjects</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, i) => {
              return (
                <tr key={i}>
                  <td>{usr.sname}</td>
                  <td>{usr.fname}</td>
                  <td>{usr.mname}</td>
                  <td>{usr.phonenumber}</td>
                  <td>{usr.email}</td>
                  <td>{usr.gender}</td>
                  <td>{usr.subjects}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(usr, i);
                      }}
                    >
                      EditUser
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(usr);
                      }}
                    >
                      DeleteUser
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
