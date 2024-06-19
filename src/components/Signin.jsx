import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username) {
        toast.error("Enter Username");
        return;
      }
      if (!password) {
        toast.error("Enter Password");
        return;
      }
      if (!remember) {
        toast.error("You must accept the Remember Me");
        return;
      }
      const response = await axios.post(
        "http://bhartiyabiotech.ap-south-1.elasticbeanstalk.com/authenticate",
        { username, password }
      );
      if (response?.data) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const { admin, userId, token } = response.data;
        // console.log(admin, userId, token);
        dispatch(login({ userId, token }));
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("admin", admin);
        if (admin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="max-md:text-center">
            <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
              Welcome To Our Website{" "}
              <span className="text-green-700">Bhartiya BioTech</span>
            </h2>
            <p className="text-sm mt-6">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-sm mt-10">
              Don't have an account{" "}
              <a
                href="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Register here
              </a>
            </p>
          </div>
          <form
            className="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full"
            onSubmit={handleLogin}
          >
            <h3 className="text-3xl font-extrabold mb-8 max-md:text-center">
              Sign in
            </h3>
            <div>
              <input
                name="username"
                type="text"
                autoComplete="username"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>
            <p className="my-10 text-sm text-gray-400 text-center">
              or continue with
            </p>
            <div className="space-x-6 flex justify-center">
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  className="inline"
                  viewBox="0 0 512 512"
                >
                  {/* SVG Path */}
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  fill="#000"
                  viewBox="0 0 22.773 22.773"
                >
                  {/* SVG Path */}
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  fill="#007bff"
                  viewBox="0 0 167.657 167.657"
                >
                  {/* SVG Path */}
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
