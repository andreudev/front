import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, signOut } from "../utils/auth";
import AddReservation from "./AddReservation";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [showAddReservation, setShowAddReservation] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:5000/api/reservations";

  useEffect(() => {
    fetchReservations();
  }, [navigate]);

  const fetchReservations = async () => {
    const token = getToken();
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(response.data);
    } catch (error) {
      console.error(error);
      signOut();
      navigate("/");
    }
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setFechaInicio(
      new Date(reservation.fecha_inicio).toISOString().slice(0, 16)
    );
    setFechaFin(new Date(reservation.fecha_fin).toISOString().slice(0, 16));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      return;
    }
    const token = getToken();
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(
        reservations.filter((reservation) => reservation._id !== id)
      );
      alert("Reserva eliminada exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la reserva");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      await axios.put(
        `${url}/${editingReservation._id}`,
        { fecha_inicio: fechaInicio, fecha_fin: fechaFin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(
        reservations.map((reservation) =>
          reservation._id === editingReservation._id
            ? { ...reservation, fecha_inicio: fechaInicio, fecha_fin: fechaFin }
            : reservation
        )
      );
      setEditingReservation(null);
      alert("Reserva actualizada exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la reserva");
    }
  };

  const handleCancel = () => {
    setEditingReservation(null);
  };

  const toggleAddReservation = () => {
    setShowAddReservation(!showAddReservation);
  };

  const handleAdd = () => {
    setShowAddReservation(false);
    fetchReservations();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Reservas</h2>
        <button
          onClick={toggleAddReservation}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {showAddReservation ? "Cancelar" : "Agregar Reserva"}
        </button>
        {showAddReservation && <AddReservation onAdd={handleAdd} />}
        {editingReservation ? (
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Editar Reserva
            </h3>
            <form onSubmit={handleUpdate}>
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
                Actualizar Reserva
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map((reservation) => (
              <li
                key={reservation._id}
                className="bg-gray-200 p-4 rounded shadow-md"
              >
                <h3 className="text-xl font-bold">
                  Sala: {reservation.salaId.nombre}
                </h3>
                <p>
                  Inicio: {new Date(reservation.fecha_inicio).toLocaleString()}
                </p>
                <p>Fin: {new Date(reservation.fecha_fin).toLocaleString()}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleEdit(reservation)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(reservation._id)}
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

export default Reservations;
