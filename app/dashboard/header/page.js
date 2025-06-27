'use client'
import React, { useEffect, useState } from "react";

const Header = () => {
  const [modal, setModal] = useState(false);
  const [loginType, setLoginType] = useState("sign_up");
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [name, setname] = useState("");
  const [afterLogin, setafterLogin] = useState(null);

  let change;
  const handleSignIn = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleType = () => {
    if (loginType === "sign_up") {
      setLoginType("sign_in");
    } else {
      setLoginType("sign_up");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(":::first here");
    let body;
    let url;
    if (loginType === "sign_in") {
      body = {
        email: formdata?.email,
        password: formdata?.password,
      };
      url = `${process.env.NEXT_PUBLIC_BACKEND_CONNECTION}/v1/existing_user`;
    } else {
      body = {
        username: formdata?.username,
        password: formdata?.password,
        email: formdata?.email,
      };
      url = `${process.env.NEXT_PUBLIC_BACKEND_CONNECTION}/v1/add_user`;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (result.success && result.token) {
        const userdata = {
          username: result?.data?.username,
          email: result?.data?.email,
        };
        // ✅ Store token and user info
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(userdata));

        setname(result?.data?.username);
        setafterLogin(result);
        setModal(false); // close modal on successful login
      } else {
        // Handle login/signup failure
        console.error("Auth failed:", result.message);
      }
      console.log("result:::", result);
      setname(result?.data?.username);
      setafterLogin(result);
      change = result;
    } catch (error) {
      console.error("Error in inserting the data ", error);
    }
  };

  const isloggedIn = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_CONNECTION}/v1/auth/check`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setname(result?.user?.email || "");
    } catch (err) {
      console.log("Error occured while fetching", err);
    }
  };

  useEffect(() => {
    console.log("name::", name);
    isloggedIn();
  }, []);

  const handleLogout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_CONNECTION}/v1/logout`, {
      method: "POST",
      credentials: "include",
    });
    await response.json();
    setname("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <div className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <h1 className="text-red-500 text-4xl font-cursive">Blog Platform</h1>
      <div className="flex gap-5  items-center">
        <h1 className="px-0 py-0">{name || ""}</h1>
        <button
          className="border border-black px-4 py-2 rounded-lg hover:bg-gray-100"
          onClick={name ? handleLogout : handleSignIn}
        >
          {name ? "Logout" : "Sign In"}
        </button>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {" "}
                {loginType === "sign_in" ? "Sign In" : "Sign Up"}
              </h2>
              <button onClick={closeModal} className="text-xl font-bold">
                &times;
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleClick}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                required={true}
                name="email"
                onChange={handleChange}
                value={formdata.email}
              />

              {loginType === "sign_up" ? (
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-2 border border-gray-300 rounded"
                  required={true}
                  name="username"
                  onChange={handleChange}
                  value={formdata.username}
                />
              ) : (
                " "
              )}
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                required={true}
                name="password"
                onChange={handleChange}
                value={formdata?.password || ""}
              />
              <p>
                {loginType === "sign_in"
                  ? "Don't have an account"
                  : "Already have an Account ? "}{" "}
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={handleType}
                >
                  {" "}
                  Click Here{" "}
                </span>
              </p>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
                // onClick={handleClick}
              >
                {loginType === "sign_in" ? "Sign In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
