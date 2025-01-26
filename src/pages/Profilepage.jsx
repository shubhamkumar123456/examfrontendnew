import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import url from "../config/URL";
import AnimatedBackground from "../components/AnimatedBackground";

const Profilepage = () => {
  const ctx = useContext(UserContext);
  const user = ctx.user?.user;

  const [userData, setuserData] = useState({
    name: "",
    email: "",
    profession: "",
    bio: "",
    profilePic: "",
  });

  const handleInputChanger = async (e) => {
    let image = e.target.files[0];
    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mediaAgain");

    try {
      let res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsf7eyovf/upload",
        formData
      );
      let data = res.data;
      if (data.secure_url) {
        handleSubmit(data.secure_url);
      } else {
        toast.error("Error uploading image", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  const handleChanger = async (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (profilePic) => {
    let obj = { ...userData };
    if (profilePic) {
      obj.profilePic = profilePic;
    }

    try {
      let res1 = await axios.put(url + "/user/updateUser", obj, {
        headers: {
          Authorization: ctx.user.token,
        },
      });
      let data1 = res1.data;
      if (data1.success === true) {
        toast.success("Updated successfully", { position: "top-center" });
        ctx.setuser({ ...ctx.user, user: { ...ctx.user.user, ...obj } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setuserData({
      ...userData,
      name: user.name || "",
      email: user.email || "",
      profession: user.profession || "",
      bio: user.bio || "",
      profilePic: user.profilePic || "",
    });
  }, [user]);

  return (
    <div className="relative bg-[#1a1a1a] text-[#FFF5E1] min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Profile Content */}
      <main className="relative z-10 w-full flex flex-col items-center m-auto py-8 px-4 md:px-16 lg:px-28">
        <div className="p-6 w-full max-w-2xl bg-[#2a2a2a] rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#BF9B30] mb-6">
            Public Profile
          </h2>
          <form className="space-y-4">
            <div className="flex items-center space-x-6">
              <img
                className="w-20 h-20 rounded-full ring-2 ring-[#BF9B30]"
                src={userData.profilePic}
                alt="Profile"
              />
              <label
                htmlFor="profile"
                className="py-2 px-4 bg-[#BF9B30] rounded-lg cursor-pointer text-black font-medium hover:bg-[#CFB53B]"
              >
                Change Picture
                <input
                  id="profile"
                  name="profilePic"
                  type="file"
                  hidden
                  onChange={handleInputChanger}
                />
              </label>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                name="name"
                value={userData.name}
                onChange={handleChanger}
                type="text"
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#BF9B30] rounded-lg focus:ring-2 focus:ring-[#BF9B30] text-[#FFF5E1]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                name="email"
                value={userData.email}
                disabled
                type="email"
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#BF9B30] rounded-lg text-[#FFF5E1]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Profession
              </label>
              <input
                name="profession"
                value={userData.profession}
                onChange={handleChanger}
                type="text"
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#BF9B30] rounded-lg focus:ring-2 focus:ring-[#BF9B30] text-[#FFF5E1]"
                placeholder="Your Profession"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChanger}
                rows="4"
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#BF9B30] rounded-lg focus:ring-2 focus:ring-[#BF9B30] text-[#FFF5E1]"
                placeholder="Write your bio here..."
              ></textarea>
            </div>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="w-full py-2 bg-[#BF9B30] text-black rounded-lg font-bold hover:bg-[#CFB53B] transition-all"
            >
              Update Profile
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profilepage;
