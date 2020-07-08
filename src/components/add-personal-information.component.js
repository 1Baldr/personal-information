import React, { Component } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCV = this.onChangeCV.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      Email: "",
      Phone: 0,
      CV: 0,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      Email: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      Phone: e.target.value,
    });
  }

  onChangeCV(e) {
    this.setState({
      CV: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const info = {
      username: this.state.username,
      Email: this.state.Email,
      Phone: this.state.Phone,
      CV: this.state.CV,
    };

    console.log(info);

    axios
      .post("http://localhost:3000/info/add", info)
      .then((res) => console.log(res.data));

    //window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Info Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.Email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Phone : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Phone}
              onChange={this.onChangePhone}
            />
          </div>
          <div className="form-group">
            <label>CV: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.CV}
              onChange={this.onChangeCV}
            />
            <input type="file" name="file" onChange={this.onChangeHandler} />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="add-personal-information Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
