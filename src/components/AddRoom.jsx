import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify";

function AddRoom({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = getToken();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rooms",
        { nombre, capacidad, ubicacion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNombre("");
      setCapacidad("");
      setUbicacion("");
      toast.success("Sala agregada exitosamente");
      onAdd(response.data);
    } catch (error) {
      console.error(error);
      setError("Error al agregar la sala");
      toast.error("Error al agregar la sala");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-2xl font-bold mb-4 text-center">Agregar Sala</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Sala"}
        </button>
      </form>
    </div>
  );
}

export default AddRoom;
