"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const services = [
  {
    title: "Ortodontia",
    description:
      "Alinhe seus dentes com aparelhos modernos e discretos, melhorando a estética e a função do seu sorriso de forma confortável e eficiente.",
    icon: (
      <FontAwesomeIcon
        icon={faCheck}
        className="h-3 w-3 p-1.5 text-blue-600 bg-primary-light-blue rounded-2xl"
      />
    ),
  },
  {
    title: "Implantes Dentários",
    description:
      "Substitua dentes perdidos com implantes fixos e seguros, recuperando a funcionalidade e o visual natural do seu sorriso.",
    icon: (
      <FontAwesomeIcon
        icon={faCheck}
        className="h-3 w-3 p-1.5 text-blue-600 bg-primary-light-blue rounded-2xl"
      />
    ),
  },
  {
    title: "Clínica Geral",
    description:
      "Cuide da saúde dos seus dentes e gengivas com atendimento completo e focado na prevenção, garantindo bem-estar e tranquilidade.",
    icon: (
      <FontAwesomeIcon
        icon={faCheck}
        className="h-3 w-3 p-1.5 text-blue-600 bg-primary-light-blue rounded-2xl"
      />
    ),
  },
  {
    title: "Endodontia (Canal)",
    description:
      "Preserve seus dentes e alivie dores com o tratamento de canal, garantindo saúde bucal e evitando extrações desnecessárias.",
    icon: (
      <FontAwesomeIcon
        icon={faCheck}
        className="h-3 w-3 p-1.5 text-blue-600 bg-primary-light-blue rounded-2xl"
      />
    ),
  },
  {
    title: "Próteses Dentárias",
    description:
      "Restaure o conforto e a confiança no seu sorriso com próteses sob medida, devolvendo a funcionalidade e estética dos seus dentes.",
    icon: (
      <FontAwesomeIcon
        icon={faCheck}
        className="h-3 w-3 p-1.5 text-blue-600 bg-primary-light-blue rounded-2xl"
      />
    ),
  },
  {
    title: "Lentes de Contato",
    description:
      "Aprimore o seu sorriso com lentes de contato dentais, proporcionando um visual alinhado e harmonioso de forma prática e segura.",
    icon: (
      <FontAwesomeIcon
        icon={faCheck}
        className="h-3 w-3 p-1.5 text-blue-600 bg-primary-light-blue rounded-2xl"
      />
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="my-24 py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-sm font-bold text-center mb-8 uppercase text-primary-dark-blue">
          Serviços
        </h2>

        <h1 className="font-bold text-3xl md:text-4xl text-gray-headline text-center mx-auto mb-12 md:w-[500px] ">
          Como podemos ajudá-lo a cuidar melhor do seu sorriso?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-primary-light-blue rounded-lg overflow-hidden p-6 text-start"
            >
              <div className="mb-4 ">{service.icon}</div>
              <h3 className="text-xl text-gray-headline font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-paragraph mb-4">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
