import Container from "../../components/container";

const Home = () => {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 border-slate-400 rounded-lg h-9 px-3 outline-none"
          type="text"
          placeholder="Digite o nome do carro"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo Brasil.
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://www.webmotors.com.br/imagens/prod/348300/MERCEDESBENZ_GLE_53_AMG_3.0_I6_GASOLINA_4MATICPLUS_9GTRONIC_34830015405424367.webp"
            alt="Carro"
          />

          <p className="font-bold mt-1 mb-2 px-2">MERCEDESBENZ GLE 53</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-500 mb-6">Ano 2025/2025 | 0KM </span>
            <strong className="text-black font-medium text-xl">
              R$ 889.900
            </strong>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-500">São Paulo - SP</span>
          </div>
        </section>

        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://www.webmotors.com.br/imagens/prod/348300/MERCEDESBENZ_GLE_53_AMG_3.0_I6_GASOLINA_4MATICPLUS_9GTRONIC_34830015405424367.webp"
            alt="Carro"
          />

          <p className="font-bold mt-1 mb-2 px-2">MERCEDESBENZ GLE 53</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-500 mb-6">Ano 2025/2025 | 0KM </span>
            <strong className="text-black font-medium text-xl">
              R$ 889.900
            </strong>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-500">São Paulo - SP</span>
          </div>
        </section>

        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://www.webmotors.com.br/imagens/prod/348300/MERCEDESBENZ_GLE_53_AMG_3.0_I6_GASOLINA_4MATICPLUS_9GTRONIC_34830015405424367.webp"
            alt="Carro"
          />

          <p className="font-bold mt-1 mb-2 px-2">MERCEDESBENZ GLE 53</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-500 mb-6">Ano 2025/2025 | 0KM </span>
            <strong className="text-black font-medium text-xl">
              R$ 889.900
            </strong>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-500">São Paulo - SP</span>
          </div>
        </section>

        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://www.webmotors.com.br/imagens/prod/348300/MERCEDESBENZ_GLE_53_AMG_3.0_I6_GASOLINA_4MATICPLUS_9GTRONIC_34830015405424367.webp"
            alt="Carro"
          />

          <p className="font-bold mt-1 mb-2 px-2">MERCEDESBENZ GLE 53</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-500 mb-6">Ano 2025/2025 | 0KM </span>
            <strong className="text-black font-medium text-xl">
              R$ 889.900
            </strong>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-500">São Paulo - SP</span>
          </div>
        </section>
      </main>
    </Container>
  );
};

export default Home;
