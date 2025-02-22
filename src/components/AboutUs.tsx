import Image from "next/image";
import Woman from "@/assets/woman-2.png";
export function AboutUs() {
  return (
    <section id="about" className="bg-primary-beige py-24 px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8 max-w-7xl">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Image
            src={Woman}
            alt="Paciente sorrindo em atendimento odontológico"
            width={520}
            height={448}
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2  md:text-left">
          <h4 className="text-sm font-bold mb-6 uppercase text-primary-dark-blue">
            Sobre Nós
          </h4>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-headline mb-4">
            Entenda quem somos e por que existimos
          </h2>
          <p className="text-gray-paragraph mb-4 leading-relaxed">
            Na Magna Odonto somos apaixonados por cuidar do seu sorriso. Nossa
            missão é proporcionar um atendimento odontológico de qualidade,
            priorizando a saúde bucal e o bem-estar de nossos pacientes. <br />
            Com uma equipe dedicada de profissionais, oferecemos serviços
            completos que vão desde a prevenção até tratamentos especializados.
            Nossa abordagem é centrada no paciente, sempre buscando as melhores
            soluções para atender suas necessidades. <br /> Estamos aqui para
            transformar sua experiência em um momento positivo, criando um
            ambiente acolhedor e confiável, onde você pode se sentir à vontade
            para cuidar da sua saúde bucal.
          </p>
        </div>
      </div>
    </section>
  );
}
