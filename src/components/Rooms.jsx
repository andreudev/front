import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, signOut } from "../utils/auth";
import EditRoom from "./EditRoom";
import AddRoom from "./AddRoom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/rooms";

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
      return;
    }

    const fetchRooms = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error(error);
        signOut();
        navigate("/");
      }
    };

    fetchRooms();
  }, [navigate]);

  const handleEdit = (room) => {
    setEditingRoom(room);
  };

  const handleUpdate = (updatedRoom) => {
    setRooms(
      rooms.map((room) => (room._id === updatedRoom._id ? updatedRoom : room))
    );
    setEditingRoom(null);
  };

  const handleDelete = async (id) => {
    const token = getToken();
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(rooms.filter((room) => room._id !== id));
      toast.success("Sala eliminada exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la sala");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar esta sala?",
      buttons: [
        {
          label: "Sí",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleCancel = () => {
    setEditingRoom(null);
  };

  const toggleAddRoom = () => {
    setShowAddRoom(!showAddRoom);
  };

  const handleAdd = (newRoom) => {
    setRooms([...rooms, newRoom]);
    setShowAddRoom(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Salas</h2>
        <button
          onClick={toggleAddRoom}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {showAddRoom ? "Cancelar" : "Agregar Sala"}
        </button>
        {showAddRoom && <AddRoom onAdd={handleAdd} />}
        {editingRoom ? (
          <EditRoom
            room={editingRoom}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <li key={room._id} className="bg-gray-200 p-4 rounded shadow-md">
                <h3 className="text-xl font-bold">{room.nombre}</h3>
                <p>Capacidad: {room.capacidad} personas</p>
                <p>Ubicación: {room.ubicacion}</p>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => handleEdit(room)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(room._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Rooms;
