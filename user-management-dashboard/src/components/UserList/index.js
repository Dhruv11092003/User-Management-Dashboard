import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./index.css"; // Import the CSS file for styling
import axios from "axios";
import UserForm from "../UserForm";

class UserList extends Component {
  state = {
    activeIndex: null, // Track the active user (for collapsible section)
    showPopup: false, // Control popup visibility
    selectedUser: null, // Track the user being edited
  };

  // Toggle the collapsible content for a specific user
  toggleCollapse = (index) => {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index,
    });
  };

  // Handle delete action
  handleDelete = async (id) => {
    const { userDataArray } = this.props;

    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      if (response.status === 200) {
        const updatedData = userDataArray.filter((user) => user.id !== id);
        localStorage.setItem("userDataArray", JSON.stringify(updatedData));
        this.props.updateUserList(updatedData);
        alert("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // Handle edit action
  handleEdit = (user) => {
    this.setState({ showPopup: true, selectedUser: user });
  };

  // Close popup
  closePopup = () => {
    this.setState({ showPopup: false, selectedUser: null });
  };

  // Update user data
  updateUser = async (id, updatedData) => {
    const { userDataArray } = this.props;

    try {
      // Send a PUT request to update the user in the API
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedData
      );

      if (response.status === 200) {
        // Update the user in the local state and local storage
        const updatedUserDataArray = userDataArray.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        );

        localStorage.setItem(
          "userDataArray",
          JSON.stringify(updatedUserDataArray)
        );
        this.props.updateUserList(updatedUserDataArray);

        // Close the popup
        this.closePopup();

        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  render() {
    const { userDataArray } = this.props;
    const { activeIndex, showPopup, selectedUser } = this.state;

    return (
      <div className="user-list-container">
        <h2 className="user-list-title">User List</h2>
        {userDataArray.map((user, index) => (
          <div key={user.id} className="user-item">
            <div className="users-tab">
              <div>
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <div className="action-buttons">
                <button
                  onClick={() => this.handleEdit(user)}
                  className="edit-btn"
                >
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
              <div>Username: {user.username}</div>
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>Street: {user.address.street}</div>
              <div>Suite: {user.address.suite}</div>
              <div>City: {user.address.city}</div>
              <div>Zipcode: {user.address.zipcode}</div>
              <div>Latitude: {user.address.geo.lat}</div>
              <div>Longitude: {user.address.geo.lng}</div>
              <div>Phone: {user.phone}</div>
              <div>Website: {user.website}</div>
              <div>Company Name: {user.company.name}</div>
              <div>Catch Phrase: {user.company.catchPhrase}</div>
              <div>BS (Business Strategy): {user.company.bs}</div>
            </div>
          </div>
        ))}

        {/* Popup for editing user */}
        {showPopup && (
          <Popup
            open={showPopup}
            closeOnDocumentClick
            onClose={this.closePopup}
          >
            <div className="popup-content">
              <UserForm
                close={this.closePopup}
                user={selectedUser}
                updateUser={this.updateUser}
              />
            </div>
          </Popup>
        )}
      </div>
    );
  }
}

export default UserList;
