import React, { useState } from "react";
import axios from "axios";

const ImportUsers = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/upload-users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(data.message); // Display success message
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload users");
    }
  };

  return (
    <div>
      <h1>Import Users</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImportUsers;
