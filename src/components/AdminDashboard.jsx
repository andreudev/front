import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rooms from "./Rooms";
import Reservations from "./Reservations";
import Users from "./Users";
import { signOut } from "../utils/auth";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("rooms");
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "rooms":
        return <Rooms />;
      case "reservations":
        return <Reservations />;
      case "users":
        return <Users />;
      default:
        return <Rooms />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setActiveTab("rooms")}
            className={`${
              activeTab === "rooms" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Salas
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`${
              activeTab === "reservations" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Reservas
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`${
              activeTab === "users" ? "bg-blue-700" : "bg-blue-500"
            } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Usuarios
          </button>
        </div>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
