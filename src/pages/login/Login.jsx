import React, { useState } from "react";
import { LogIn } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [identifier, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [role, setRole] = useState("supremeadmin");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const logInData = { identifier, password };
      let response;

      if (role === "supremeadmin") {
        response = await LogIn(logInData);

        const token = response?.data?.token;
        const supremeAdminId =
          response?.data?.supremeAdmin?._id || response?.data?.supremeAdmin_id;

        if (!token || !supremeAdminId) {
          console.error("❌ Token or supremeAdmin_id missing in response");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("supremeAdmin_id", supremeAdminId);
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);

        alert("✅ Log In Successfully");
        setTimeout(() => navigate("/supreme-admin"), 800);
      } else if (role === "staff") {
        response = await LogIn(logInData);

        const token = response?.data?.token;
        const staffId = response?.data?.staff?._id || response?.data?.staff_id;

        if (!token || !staffId) {
          console.error("❌ Token or staff_id missing in response");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("staff_id", staffId);
       
        localStorage.setItem("role", role);

        alert("✅ Log In Successfully");
        setTimeout(() => navigate("/staff"), 800);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white-500 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h3>

        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={identifier}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-md outline-none focus:ring focus:ring-blue-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-md outline-none focus:ring focus:ring-blue-300"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Login As
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 border px-3 py-2 rounded-md outline-none focus:ring focus:ring-blue-300"
            >
              <option value="supremeadmin">supreme admin</option>
              <option value="staff">staff</option>
              {/* Future use */}
              {/* <option value="user">User / Patient</option> */}
            </select>
          </div>

          <div className="flex items-center justify-end">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-gray-600 text-white py-1 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center justify-center"

          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
