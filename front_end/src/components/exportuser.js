import React from "react";
import axios from "axios";

const ExportUsers = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/export-user", {
        responseType: "blob", 
      });

      // Create a download link for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.xlsx"); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to export users");
    }
  };

  return (
    <div>
      <h1>Export Users</h1>
      <button onClick={handleExport}>Export</button>
    </div>
  );
};

export default ExportUsers;
