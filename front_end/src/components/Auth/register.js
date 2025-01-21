import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: '',
    dob: '',
    gender: '',
    mobile: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/userreg", formData);
      alert(data.message); 
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="role"
        name="role"
        placeholder="role"
        value={formData.role}
        onChange={handleChange}
      />
      <input
        type="dob"
        name="dob"
        placeholder="dob"
        value={formData.dob}
        onChange={handleChange}
      />
      <input
        type="gender"
        name="gender"
        placeholder="gender"
        value={formData.gender}
        onChange={handleChange}
      />
      <input
        type="mobile"
        name="mobile"
        placeholder="mobile"
        value={formData.mobile}
        onChange={handleChange}
      />
      <input
        type="city"
        name="city"
        placeholder="city"
        value={formData.city}
        onChange={handleChange}
      />
      <input
        type="state"
        name="state"
        placeholder="state"
        value={formData.state}
        onChange={handleChange}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
