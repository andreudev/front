import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reservations from "./Reservations";
import { signOut, getToken } from "../utils/auth";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/users/profile";

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
        signOut();
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">User Dashboard</h2>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        {user ? (
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <BsFillPersonFill className="text-gray-500 mr-2" size={30} />
              <p className="text-lg">Email: {user.correo}</p>
            </div>
            <Reservations />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
