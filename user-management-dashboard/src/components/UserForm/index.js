import { useState } from "react";
import "./index.css"; // Make sure to import the CSS file for styling
import ClipLoader from "react-spinners/ClipLoader";

const UserForm = (props) => {
  const { close, addUser } = props;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    lat: "",
    lng: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
  });

  const [errors, setErrors] = useState({});

  const addUserData = (payload) => {
    addUser(payload);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear error when user starts typing
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Required fields validation
    Object.keys(userData).forEach((key) => {
      if (!userData[key]) {
        valid = false;
        newErrors[key] = "This field is required";
      }
    });

    // Email validation
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      valid = false;
      newErrors.email = "Invalid email format";
    }

    // Phone number validation
    if (userData.phone && !/^\d{10}$/.test(userData.phone)) {
      valid = false;
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return valid;
  };

  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (validateForm()) {
        const payload = {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          address: {
            street: userData.street,
            suite: userData.suite,
            city: userData.city,
            zipcode: userData.zipcode,
            geo: {
              lat: userData.lat,
              lng: userData.lng,
            },
          },
          phone: userData.phone,
          website: userData.website,
          company: {
            name: userData.companyName,
            catchPhrase: userData.catchPhrase,
            bs: userData.bs,
          },
        };

        console.log("Form submitted successfully:", payload);
        setLoading(false);
        addUserData(payload);
      } else {
        console.log("Form contains errors");
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="modal-content">
      <button className="close-btn" onClick={close}>
        &times;
      </button>
      <div className="form-container">
        <h2 className="form-title">User Information Form</h2>
        <form className="user-form" onSubmit={submitData}>
          {Object.keys(userData).map((key) => (
            <div className="form-group" key={key}>
              <label className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                className="form-input"
                type={
                  key === "email" ? "email" : key === "website" ? "url" : "text"
                }
                name={key}
                value={userData[key]}
                onChange={handleChange}
              />
              {errors[key] && (
                <span className="error-message">{errors[key]}</span>
              )}
            </div>
          ))}
          {loading ? (
            <button className="submit-btn" type="submit">
              <ClipLoader color="#ffffff" />
            </button>
          ) : (
            <button className="submit-btn" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
