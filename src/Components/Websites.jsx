import { Component } from "react";

export default class Websites extends Component{
  render(){
    return <div>
      <ul>
      {this.props.info.map ((usr,i)=>{
        return <li key={i}>{usr.website}</li>

})}
      </ul>
    </div>
  }
  componentWillUnmount(){
    alert("Component is removed now ")
  

  }
}
