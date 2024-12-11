import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

function AddReservation({ onAdd }) {
  const [salas, setSalas] = useState([]);
  const [salaId, setSalaId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    const fetchSalas = async () => {
      const token = getToken();
      try {
        const response = await axios.get("http://localhost:5000/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSalas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      await axios.post(
        "http://localhost:5000/api/reservations",
        { salaId, fecha_inicio: fechaInicio, fecha_fin: fechaFin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalaId("");
      setFechaInicio("");
      setFechaFin("");
      onAdd();
      alert("Reserva agregada exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al agregar la reserva");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-2xl font-bold mb-4 text-center">Agregar Reserva</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="salaId"
          >
            Sala
          </label>
          <select
            id="salaId"
            value={salaId}
            onChange={(e) => setSalaId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione una sala</option>
            {salas.map((sala) => (
              <option key={sala._id} value={sala._id}>
                {sala.nombre} - {sala.ubicacion}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fechaInicio"
          >
            Fecha de Inicio
          </label>
          <input
            type="datetime-local"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fechaFin"
          >
            Fecha de Fin
          </label>
          <input
            type="datetime-local"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Reserva
        </button>
      </form>
    </div>
  );
}

export default AddReservation;
