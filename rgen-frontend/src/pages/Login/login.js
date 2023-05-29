import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { userId } = data;

        if (userId === "0") {
          setErrorMessage("Invalid email or password");
        } else {
          onLogin(userId);
          navigate("/dashboard");
        }
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="absolute container mx-2 px-4 py-2 left-1/3 w-1/3 top-40 h-1/2 bg-green-50 flex flex-col justify-center items-center rounded-3xl border-8 border-white shadow-lg">
      <h6 className="text-l mb-4">Welcome back!</h6>
      <h6 className="text-l mb-4">Ready to create your next video</h6>
      <form onSubmit={handleLogin} className="max-w-sm">
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full"
            // style={{ width: "300px" }}
            required
            placeholder="Email/ Phone Number"
          />
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 w-80"
            //   style={{ width: "300px" }}
              required
              placeholder="Password"
            />
            <label
              htmlFor="showPassword"
              className="absolute right-2 top-2 cursor-pointer"
            >
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={handleCheckboxChange}
                className="mr-1"
              />
              Show Password
            </label>
          </div>
        </div>
        <div className="text-red-500 mb-4">{errorMessage}</div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-blue-700 font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
