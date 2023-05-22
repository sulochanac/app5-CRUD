import { Component } from "react";
import UpdateDetails from "./UpdateDetails";

export default class LifecycleChild extends Component {
  constructor() {
    console.log("I am from Constructor")
    super();

    this.state = {
      message: "",
      users: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log(props);
    // if (props.myName == "Sulochana") {
    //   return {
    //     myName: "Sulochana Reddy",
    //   };
    // }
    if (props.age < 18) {
      return {
        message: "You are a Teenager",
        age: props.age,
      };
    }
    return null;
  }
  getData=()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({ users: data });
    });
  }

  render() {
    return (
      <div>
        <h2>Welcome to Lifecycle Child Component</h2>
        {/* {this.state.myName} */}
        <p>{this.state.age}</p>
        <p>{this.state.message}</p>
        <button onClick={this.getData}>Get Data</button>
        <hr />
        {/* <ul>
          {this.state.users.map((usr, i) => {
            return <li key={i}>{usr.email}</li>;
          })}
        </ul> */}
        <UpdateDetails users={this.state.users}/>
      </div>
    );
  }
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     this.setState({ users: data });
    //   });
  }
}
