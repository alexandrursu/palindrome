import React, { Component } from "react";
import "./App.css";
import MessagesList from "./components/MessagesList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MessagesList />
      </div>
    );
  }
}

export default App;
