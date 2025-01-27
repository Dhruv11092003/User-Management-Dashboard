import React, { Component } from "react";
import "./index.css"; // Import the CSS file for styling

class UserList extends Component {
  state = {
    activeIndex: null, // Track the active user (for collapsible section)
  };

  // Toggle the collapsible content for a specific user
  toggleCollapse = (index) => {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
    });
  };

  // Handle delete action
  handleDelete = (id) => {
    const { userDataArray } = this.props;
    const updatedData = userDataArray.filter((user) => user.id !== id);
    localStorage.setItem("userDataArray", JSON.stringify(updatedData)); // Update local storage
    this.props.updateUserList(updatedData); // Pass updated data to parent
  };

  render() {
    const { userDataArray, handleEdit } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="user-list-container">
        <h2 className="user-list-title">User List</h2>
        {userDataArray.map((user, index) => (
          <div key={user.id} className="user-item">
            <div className="users-tab">
              <div >
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <div className="action-buttons">
                <button onClick={() => handleEdit(user)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => this.handleDelete(user.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
              <button
                className="collapsible-toggle"
                onClick={() => this.toggleCollapse(index)}
              >
                {activeIndex === index ? "Hide Details" : "Show Details"}
              </button>
            </div>
            <div
              className={`collapsible-content ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div>Street: {user.address.street}</div>
              <div>Suite: {user.address.suite}</div>
              <div>City: {user.address.city}</div>
              <div>Zipcode: {user.address.zipcode}</div>
              <div>Phone: {user.phone}</div>
              <div>Website: {user.website}</div>
              <div>Company: {user.company.name}</div>
              <div>Catch Phrase: {user.company.catchPhrase}</div>
              <div>BS: {user.company.bs}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserList;
