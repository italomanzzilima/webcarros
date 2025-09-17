import { useState, useEffect } from "react";
import Container from "../../components/container";
import VehicleCard from "../../components/VehicleCard";
import {
  fetchAllCars,
  fetchCarsByName,
  type CarProps,
} from "../../services/carService";

const Home = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState("");

  async function loadCars() {
    setLoading(true);
    try {
      const listCars = await fetchAllCars();
      setCars(listCars);
    } catch (err) {
      console.error("Error loading cars:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearchCar() {
    setLoading(true);
    try {
      const listCars = await fetchCarsByName(input);
      setCars(listCars);
    } catch (err) {
      console.error("Error loading cars:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 border-slate-400 rounded-lg h-9 px-3 outline-none"
          type="text"
          name="search"
          placeholder="Digite o nome do carro"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg cursor-pointer"
          onClick={handleSearchCar}
        >
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo Brasil.
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <p>Loading...</p>}
        {!loading &&
          cars.length > 0 &&
          cars.map((car) => <VehicleCard key={car.id} car={car} />)}
      </main>
    </Container>
  );
};

export default Home;
