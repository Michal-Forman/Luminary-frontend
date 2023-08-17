import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import backendUrl from "../components/Config";

function Profile() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("M0");
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      console.log("M1");

      try {
        console.log("M2");
        const response = await axios.post(
          `${backendUrl}/profile-image/${user._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        console.log("Image uploaded:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="titleContainer">
        <h1 className="title">Profile</h1>
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>upload</button>
      </div>
    </>
  );
}

export default Profile;
