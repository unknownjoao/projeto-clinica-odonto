import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase/config";
import type { Appointment } from "../lib/types/appointment";

// Serviço de agendamento
export const appointmentService = {
  // Função para verificar a disponibilidade de um horário específico
  async checkAvailability(date: string, timeSlot: string): Promise<boolean> {
    const appointmentsRef = collection(db, "appointments");
    const q = query(
      appointmentsRef,
      where("date", "==", date),
      where("timeSlot", "==", timeSlot)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  },
  // Função para criar um novo agendamento
  async createAppointment(
    appointmentData: Omit<Appointment, "id" | "createdAt">
  ): Promise<string> {
    const appointment = {
      ...appointmentData,
      createdAt: Timestamp.now(),
    };

    const isAvailable = await this.checkAvailability(
      appointment.date,
      appointment.timeSlot
    );

    if (!isAvailable) {
      throw new Error("Horário não está mais disponível");
    }

    const docRef = await addDoc(collection(db, "appointments"), appointment);
    return docRef.id;
  },
  // Verifica se o horário está disponível
  async getAvailableTimeSlots(
    date: string,
    allTimeSlots: string[]
  ): Promise<string[]> {
    const appointmentsRef = collection(db, "appointments");
    const q = query(appointmentsRef, where("date", "==", date));
    const querySnapshot = await getDocs(q);

    const bookedSlots = new Set(
      querySnapshot.docs.map((doc) => doc.data().timeSlot)
    );
    return allTimeSlots.filter((slot) => !bookedSlots.has(slot));
  },
};
