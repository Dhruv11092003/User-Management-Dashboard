import { useState, useEffect } from "react";
import "./index.css"; // Import the CSS file for styling
import ClipLoader from "react-spinners/ClipLoader";

const UserForm = (props) => {
  const { close, addUser, user, updateUser } = props;
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

  useEffect(() => {
    if (user) {
      // Flatten address and company fields when editing
      setUserData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        street: user.address?.street || "",
        suite: user.address?.suite || "",
        city: user.address?.city || "",
        zipcode: user.address?.zipcode || "",
        lat: user.address?.geo?.lat || "",
        lng: user.address?.geo?.lng || "",
        phone: user.phone || "",
        website: user.website || "",
        companyName: user.company?.name || "",
        catchPhrase: user.company?.catchPhrase || "",
        bs: user.company?.bs || "",
      });
    }
  }, [user]);

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

        if (user) {
          // If editing, update user
          updateUser(user.id, payload);
        } else {
          // If adding, add user
          addUser(payload);
        }

        setLoading(false);
        close(); // Close modal on success
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.error("Error:", e.message);
      setLoading(false);
    }
  };

  return (
    <div className="modal-content">
      <button className="close-btn" onClick={close}>
        &times;
      </button>
      <div className="form-container">
        <h2 className="form-title">
          {user ? "Edit User Information" : "Add New User"}
        </h2>
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
            <button className="submit-btn" type="submit" disabled>
              <ClipLoader color="#ffffff" />
            </button>
          ) : (
            <button className="submit-btn" type="submit">
              {user ? "Update" : "Submit"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;
