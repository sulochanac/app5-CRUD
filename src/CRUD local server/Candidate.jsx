import { Component } from "react";
import axios from "axios";
export default class Candidate extends Component {
  constructor(props) {
    super();

    this.state = {
      user: {
        name: "",
        fname: "",
        mname: "",
        number: "",
        email: "",
        gender: "",
        dob: "",
        address: "",
        blood: "",
        department: "",
        courses: [],
      },
      isEdit: false,
      users: [],
    };
  }
  
  handleChange = (e) => {
      var newperson = { ...this.state.user };
      if (e.target.name !== "course") {
        newperson[e.target.name] = e.target.value;
      } else {
        if (newperson.courses.indexOf(e.target.value) == -1) {
          newperson.courses.push(e.target.value);
        } else {
          newperson.courses = newperson.courses.filter((course) => {
            return course !== e.target.value;
          });
        }
      }
      this.setState({ user: newperson });
      console.log(e.target.value);
    };
  updateUser = () => {};
  addUser = () => {
    axios.post("http://localhost:3000/users", this.state.user).then(() => {
      console.log("User Added Successfully");
      this.clearForm();
      this.getAllUsers();
    });
  };

  getAllUsers = () => {
    axios.get("http://localhost:3000/users").then((res) => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
  };
  clearForm = () => {
    var newperson = {
      name: "",
      fname: "",
      mname: "",
      number: "",
      email: "",
      gender: "",
      dob: "",
      address: "",
      blood: "",
      department: "",
      courses: [],
      isEdit: false,
      gIndex: 0,
    };
    this.setState({ user: newperson });
  };

  handleEdit = (usr) => {
    this.setState({ user: usr, isEdit: true });
  };

  updateUser = () => {
    axios
      .put("http://localhost:3000/users/" + this.state.user.id, this.state.user)
      .then((res) => {
        this.getAllUsers();
        this.clearForm();
      });
  };
  handleDelete=(usr)=>{
    axios.delete("http://localhost:3000/users/"+usr.id).then(()=>{
        this.getAllUsers()
    })
  }
  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    var {name,fname, mname,number, email, gender, dob,address,blood,department,courses } = this.state.user;
    var { isEdit, users } = this.state;
    var { handleChange, updateUser, addUser, handleEdit,handleDelete } = this;
  
    return <div>
      <form>
          <h1>Student Registration Form</h1>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="fname">Father Name:</label>
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="mname">Mother Name:</label>
          <input
            type="text"
            name="mname"
            value={mname}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="number">Phone Namuber:</label>
          <input
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="gender">Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender == "Male"}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender == "Female"}
            onChange={handleChange}
          />{" "}
          famele
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={gender == "Other"}
            onChange={handleChange}
          />{" "}
          Other <br />
          <br />
          <label htmlFor="dob">Date of birth:</label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={handleChange}
          />{" "}
          (dd/mm/yyy) <br />
          <br />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="blood">Blood Group:</label>
          <select
            name="blood"
            value={blood}
            onChange={handleChange}
          >
            <option value="O+">select</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
          </select>
          <br />
          <br />
          <label htmlFor="department">Department:</label>
          <input
            type="radio"
            name="department"
            value="Mech"
            checked={department == "Mech"}
            onChange={handleChange}
          />
          mech
          <input
            type="radio"
            name="department"
            value="Civil"
            checked={department == "Civil"}
            onChange={handleChange}
          />
          civil
          <input
            type="radio"
            name="department"
            value="IT"
            checked={department == "IT"}
            onChange={handleChange}
          />
          It
          <br />
          <br />
          <label htmlFor="courses">Course:</label>
          <input
            type="checkbox"
            name="course"
            value="HTML"
            checked={courses.indexOf("HTML") > -1}
            onChange={handleChange}
          />
          HTML
          <input
            type="checkbox"
            name="course"
            value="CSS"
            checked={courses.indexOf("CSS") > -1}
            onChange={handleChange}
          />
          CSS
          <input
            type="checkbox"
            name="course"
            value="JavaScript"
            checked={courses.indexOf("JavaScript") > -1}
            onChange={handleChange}
          />
          JavaScript
          <input
            type="checkbox"
            name="course"
            value="ReactJs"
            checked={courses.indexOf("ReactJs") > -1}
            onChange={handleChange}
          />
          ReactJs
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
            <th>Name</th>
              <th>FatherName</th>
              <th>MotherName</th>
              <th>PhoneNumber</th>
              <th>Email</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Blood Group</th>
              <th>Department</th>
              <th>Courses</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, i) => {
              return (
                <tr key={i}>
                  <td>{usr.name}</td>
                  <td>{usr.fname}</td>
                  <td>{usr.mname}</td>
                  <td>{usr.number}</td>
                  <td>{usr.email}</td>
                  <td>{usr.gender}</td>
                  <td>{usr.dob}</td>
                  <td>{usr.address}</td>
                  <td>{usr.blood}</td>
                  <td>{usr.department}</td>
                  <td>{usr.courses}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(usr, i);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>{handleDelete(usr)}}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  }
}
  
