import { Component } from "react";
import Websites from "./Websites";

export default class UpdateDetails extends Component {
  constructor() {
    console.log("I am from constructor !!  from Update details component");

    super();

    this.state = {
      showWebsites:true,

    };
  }
  // to check the props

   static getDerivedStateFromProps(props,state){
    if (props.users.length ==10){
      return{
        users : props.users.splice(5,5),
      }
    };
    console.log("I am from getDerivedStateFromProps !!  from Update details component")
    return null
   }
   // will be called to render data
  render() {
    console.log("I am from Render !!  from Update details component");
    return (
      <div>
        <ul>
          {this.props.users.map((usr, i) => {
            return <li key={i}>{usr.email}</li>;
          })}
        </ul>
        {/* <Websites info={this.props.users}/> */}
       <button onClick={()=>{this.setState({showWebsites:false})}} >Hide Websites</button>
        {this.state.showWebsites && <Websites info={this.props.users}/> }
      </div>
    );
  }
  // will decide where component should update or not
  shouldComponentUpdate(){
    console.log("shouldComponentUpdate is called")
    return true
  }
  // will be called after component update complete
  componentDidUpdate(){
    console.log("componentDidUpdate is called")
  }
}
