import { Timestamp } from "firebase/firestore";

// Interface que define a estrutura de um agendamento
export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  message: string;
  createdAt: Timestamp;
}

// Interface que define a estrutura de um horário de agendamento
export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}
