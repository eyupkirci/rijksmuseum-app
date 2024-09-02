// src/components/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      const token = (await user.getIdToken()) || "";
      if (token) {
        dispatch(setToken(token));
      }
    } catch (error: unknown) {
      setError("Failed to log in: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 focus:bg-gray-200 transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
