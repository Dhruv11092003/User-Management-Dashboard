import { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";
import UserForm from "../UserForm";
import axios from "axios";
import UserList from "../UserList";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorCard from "../ErrorComponent";
class Home extends Component {
  state = {
    userDataArray: [],
    error: false,
    loading:false,
  };

  // functions for local storage
  setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  updateUserList = (updatedData) => {
    this.setState({ userDataArray: updatedData });
    this.setLocalStorage("userDataArray", updatedData);
  };

  componentDidMount = async () => {
    try {
      // Set loading state to true
      this.setState({ loading: true });
  
      // Check local storage for user data
      const localData = this.getLocalStorage("userDataArray");
      if (localData) {
        // Load data from local storage
        this.setState({ userDataArray: localData, loading: false });
      } else {
        // Fetch data from API using axios if no local data exists
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = response.data;
  
        // Update state with fetched data and save it to local storage
        this.setState({ userDataArray: data, loading: false });
        this.setLocalStorage("userDataArray", data);
      }
    } catch (error) {
      // Handle error state
      console.error("Error fetching users:", error);
      this.setState({ error: true, loading: false });
    }
  };
  

  addUserData = async (payload) => {
    try {
      const { userDataArray } = this.state;

      // Add the new user to the local userDataArray
      const newUserDataArray = [
        ...userDataArray,
        { id: userDataArray.length + 1, ...payload },
      ];

      // Mock API POST call
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        payload
      );

      if (response.status === 201) {
        this.setState({ userDataArray: newUserDataArray }); // Update local state
        this.setLocalStorage("userDataArray", newUserDataArray); // Save updated array to local storage
        console.log("Updated userDataArray:", newUserDataArray); // Verify updated array
        alert("User created successfully");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  render() {
    const { userDataArray, loading, error } = this.state; // Access local user data array
  
    return (
      <div className="home-container">
        {loading ? (
          <div className="loading-container">
            <ClipLoader color="#4A90E2" size={50} />
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <ErrorCard />
          </div>
        ) : (
          <div className="main-home-container">
            <Popup
              trigger={<button className="add-user-btn">Add User</button>}
              modal
              nested
              className="popup-content"
            >
              {(close) => (
                <div>
                  <UserForm addUser={this.addUserData} close={close} />
                </div>
              )}
            </Popup>
            <div className="users-container">
              <UserList
                userDataArray={userDataArray}
                updateUserList={this.updateUserList}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  
}

export default Home;
