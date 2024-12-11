import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

function EditRoom({ room, onUpdate, onCancel }) {
  const [nombre, setNombre] = useState(room.nombre);
  const [capacidad, setCapacidad] = useState(room.capacidad);
  const [ubicacion, setUbicacion] = useState(room.ubicacion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/rooms/${room._id}`,
        { nombre, capacidad, ubicacion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate(response.data);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la sala");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-2xl font-bold mb-4 text-center">Editar Sala</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre de la Sala
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="capacidad"
          >
            Capacidad
          </label>
          <input
            type="number"
            id="capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ubicacion"
          >
            Ubicación
          </label>
          <input
            type="text"
            id="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Actualizar Sala
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditRoom;
