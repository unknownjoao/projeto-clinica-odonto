import { useState, ChangeEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { appointmentService } from "../services/appointment";
import { toast } from "react-hot-toast";
import type { TimeSlot } from "../lib/types/appointment";
import {
  faClock,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";

interface FormData {
  name: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
  timeSlot?: string;
}

interface AppointmentModalProps {
  onClose: () => void;
}

const services = [
  "Ortodontia",
  "Implantes Dentários",
  "Clínica Geral",
  "Endodontia",
  "Próteses Dentárias",
  "Lentes de Contato",
] as const;

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    slots.push({
      id: `${hour}:00`,
      time: `${hour}:00`,
      isAvailable: true,
    });
  }
  return slots;
};

export default function AppointmentModal({ onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    date: "",
    timeSlot: "",
    message: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedDate) {
        setIsLoading(true);
        try {
          const allSlots = generateTimeSlots().map((slot) => slot.time);
          const availableSlots = await appointmentService.getAvailableTimeSlots(
            selectedDate,
            allSlots
          );

          setAvailableTimeSlots(
            allSlots.map((time) => ({
              id: time,
              time,
              isAvailable: availableSlots.includes(time),
            }))
          );
        } catch (error) {
          toast.error("Erro ao carregar horários disponíveis");
          console.error("Erro ao buscar horários:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  // Validate form data on each change
  useEffect(() => {
    validateField();
  }, [formData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "date") {
      setSelectedDate(value);
    }

    // Mark field as touched
    setTouchedFields({ ...touchedFields, [name]: true });

    // Special handling for phone field - only allow numbers and formatting
    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 11) {
        // Format phone number as (XX) XXXXX-XXXX
        let formattedPhone = "";
        if (numbersOnly.length > 0) {
          formattedPhone = `(${numbersOnly.slice(0, 2)}`;
          if (numbersOnly.length > 2) {
            formattedPhone += `) ${numbersOnly.slice(2, 7)}`;
            if (numbersOnly.length > 7) {
              formattedPhone += `-${numbersOnly.slice(7, 11)}`;
            }
          }
        }
        setFormData({ ...formData, [name]: formattedPhone });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateField = (specificField?: string): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Only validate touched fields or the specific field being checked
    const fieldsToValidate = specificField
      ? [specificField]
      : Object.keys(touchedFields).filter((field) => touchedFields[field]);

    fieldsToValidate.forEach((field) => {
      switch (field) {
        case "name":
          if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório";
            isValid = false;
          } else if (formData.name.trim().length < 3) {
            newErrors.name = "Nome deve ter pelo menos 3 caracteres";
            isValid = false;
          }
          break;

        case "phone":
          const phoneDigits = formData.phone.replace(/\D/g, "");
          if (!formData.phone) {
            newErrors.phone = "Telefone é obrigatório";
            isValid = false;
          } else if (phoneDigits.length !== 11) {
            newErrors.phone = "Telefone deve ter 11 dígitos (DDD + número)";
            isValid = false;
          }
          break;

        case "service":
          if (!formData.service) {
            newErrors.service = "Selecione um serviço";
            isValid = false;
          }
          break;

        case "date":
          if (!formData.date) {
            newErrors.date = "Selecione uma data";
            isValid = false;
          } else {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
              newErrors.date = "A data não pode ser no passado";
              isValid = false;
            } else {
              // Check if it's a weekend
              const dayOfWeek = selectedDate.getDay();
              if (dayOfWeek === 0 || dayOfWeek === 6) {
                newErrors.date = "Não atendemos aos finais de semana";
                isValid = false;
              }
            }
          }
          break;

        case "timeSlot":
          if (!formData.timeSlot) {
            newErrors.timeSlot = "Selecione um horário";
            isValid = false;
          }
          break;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const validateForm = (): boolean => {
    // Mark all relevant fields as touched based on current step
    const fieldsToTouch: Record<string, boolean> = {};

    if (step === 1) {
      fieldsToTouch.name = true;
      fieldsToTouch.phone = true;
    } else if (step === 2) {
      fieldsToTouch.service = true;
      fieldsToTouch.date = true;
      fieldsToTouch.timeSlot = true;
    }

    setTouchedFields((prev) => ({ ...prev, ...fieldsToTouch }));

    // Validate all fields for the current step
    const currentStepFields = Object.keys(fieldsToTouch);
    let isValid = true;

    currentStepFields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Show a more specific error message based on validation errors
      const errorMessages = Object.values(errors).filter(Boolean);
      if (errorMessages.length > 0) {
        toast.error(errorMessages[0]);
      } else {
        toast.error("Por favor, corrija os campos destacados");
      }
    }

    return isValid;
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields({ ...touchedFields, [fieldName]: true });
    validateField(fieldName);
  };

  const handleNext = () => {
    if (validateForm() && step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const formatWhatsAppMessage = (): string => {
    return encodeURIComponent(
      `Olá! Me chamo ${formData.name} e gostaria de agendar uma consulta.\n\n` +
        `Serviço: ${formData.service}\n` +
        `Telefone: ${formData.phone}\n` +
        `Data: ${formData.date}\n` +
        `Horário: ${formData.timeSlot}\n` +
        `Mensagem adicional: ${formData.message}`
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Verificar disponibilidade novamente antes de criar
      const isAvailable = await appointmentService.checkAvailability(
        formData.date,
        formData.timeSlot
      );

      if (!isAvailable) {
        toast.error("Este horário já foi reservado. Por favor, escolha outro.");
        setStep(2);
        return;
      }

      // Criar agendamento no Firebase
      await appointmentService.createAppointment(formData);

      // Enviar mensagem no WhatsApp
      const whatsappNumber = "5511999999999";
      const message = formatWhatsAppMessage();
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

      toast.success("Consulta agendada com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Erro ao agendar consulta. Tente novamente.");
      console.error("Erro ao criar agendamento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-paragraph hover:text-primary-dark-blue"
        >
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary-blue">
            Agende sua Consulta
          </h2>
          <p className="text-gray-paragraph">
            {isLoading ? "Carregando..." : "Preencha os dados para agendamento"}
          </p>
        </div>

        {/* Progresso do andamento do agendamento */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num
                      ? "bg-primary-blue text-white"
                      : "bg-primary-light-blue text-primary-dark-blue"
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div className="w-24 h-1 mx-2">
                    <div
                      className={`h-full ${
                        step > num ? "bg-primary-blue" : "bg-primary-light-blue"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Aba 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-headline mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dark-blue w-5 h-5"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("name")}
                  className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-primary-beige ${
                    errors.name && touchedFields.name
                      ? "border-red-500"
                      : "border-off-white"
                  }`}
                  placeholder="Digite seu nome"
                  disabled={isLoading}
                />
              </div>
              {errors.name && touchedFields.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-headline mb-1">
                Telefone
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dark-blue w-5 h-5"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("phone")}
                  className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-primary-beige ${
                    errors.phone && touchedFields.phone
                      ? "border-red-500"
                      : "border-off-white"
                  }`}
                  placeholder="(00) 00000-0000"
                  disabled={isLoading}
                />
              </div>
              {errors.phone && touchedFields.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
        )}

        {/* Aba 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-headline mb-1">
                Serviço Desejado
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                onBlur={() => handleBlur("service")}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-primary-beige ${
                  errors.service && touchedFields.service
                    ? "border-red-500"
                    : "border-off-white"
                }`}
                disabled={isLoading}
              >
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && touchedFields.service && (
                <p className="mt-1 text-sm text-red-500">{errors.service}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-headline mb-1">
                Data da Consulta
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faClock}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dark-blue w-5 h-5"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("date")}
                  min={new Date().toISOString().split("T")[0]}
                  className={`pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-primary-beige ${
                    errors.date && touchedFields.date
                      ? "border-red-500"
                      : "border-off-white"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.date && touchedFields.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-headline mb-1">
                  Horário Disponível
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => {
                        setFormData({ ...formData, timeSlot: slot.time });
                        setTouchedFields({ ...touchedFields, timeSlot: true });
                      }}
                      className={`p-2 rounded-lg text-sm ${
                        formData.timeSlot === slot.time
                          ? "bg-primary-blue text-white"
                          : "bg-primary-light-blue text-primary-dark-blue hover:bg-primary-blue hover:text-white"
                      } ${
                        !slot.isAvailable || isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={!slot.isAvailable || isLoading}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && touchedFields.timeSlot && (
                  <p className="mt-1 text-sm text-red-500">{errors.timeSlot}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Aba 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-headline mb-1">
                Mensagem Adicional
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMessage}
                  className="absolute left-3 top-3 text-primary-dark-blue w-5 h-5"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="pl-10 w-full p-2 border border-off-white rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-primary-beige outline-none"
                  placeholder="Alguma observação importante?"
                  rows={4}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Resumo da consulta */}
            <div className="mt-4 p-4 bg-primary-light-blue rounded-lg">
              <h3 className="font-medium text-primary-dark-blue mb-2">
                Resumo da Consulta
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <span className="font-medium">Nome:</span> {formData.name}
                </li>
                <li>
                  <span className="font-medium">Telefone:</span>{" "}
                  {formData.phone}
                </li>
                <li>
                  <span className="font-medium">Serviço:</span>{" "}
                  {formData.service}
                </li>
                <li>
                  <span className="font-medium">Data:</span>{" "}
                  {formData.date &&
                    new Date(formData.date).toLocaleDateString("pt-BR")}
                </li>
                <li>
                  <span className="font-medium">Horário:</span>{" "}
                  {formData.timeSlot}
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 border border-primary-blue text-primary-blue rounded-lg hover:bg-primary-light-blue"
              disabled={isLoading}
            >
              Voltar
            </button>
          )}
          <button
            onClick={step < 3 ? handleNext : handleSubmit}
            disabled={isLoading}
            className={`px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-hover-blue ${
              step === 1 ? "ml-auto" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processando...
              </span>
            ) : step < 3 ? (
              "Próximo"
            ) : (
              "Agendar via WhatsApp"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
