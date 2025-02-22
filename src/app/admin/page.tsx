"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase/config";
// import { Calendar, Clock, Trash2, User, Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";

interface AdminAppointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
      if (user) {
        fetchAppointments();
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError("Email ou senha inválidos");
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const appointmentsRef = collection(db, "appointments");
      const q = query(appointmentsRef, orderBy("date", "asc"));
      const querySnapshot = await getDocs(q);

      const appointmentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AdminAppointment[];

      setAppointments(appointmentsData);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        await deleteDoc(doc(db, "appointments", id));
        await fetchAppointments();
      } catch (err) {
        console.error("Erro ao deletar agendamento:", err);
      }
    }
  };

  const filterAppointmentsByDate = (appointments: AdminAppointment[]) => {
    return appointments.filter((app) => app.date === selectedDate);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Área Administrativa
            </h2>
            <p className="mt-2 text-gray-600">
              Faça login para acessar o painel
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-blue focus:border-primary-blue focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-blue focus:border-primary-blue focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-primary-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel Administrativo
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por Data
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-blue focus:border-primary-blue"
              />
            </div>
            <button
              onClick={fetchAppointments}
              className="mt-6 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-dark-blue"
            >
              Atualizar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filterAppointmentsByDate(appointments).map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="h-5 w-5 text-gray-400 mr-2"
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.service}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="h-5 w-5 text-gray-400 mr-2"
                        />
                        <div className="text-sm text-gray-900">
                          {appointment.date}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="h-5 w-5 text-gray-400 mr-2"
                        />
                        <div className="text-sm text-gray-900">
                          {appointment.timeSlot}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="h-5 w-5 text-gray-400 mr-2"
                        />
                        <div className="text-sm text-gray-900">
                          {appointment.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
