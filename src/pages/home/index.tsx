import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import Container from "../../components/container";
import { Link } from "react-router";

interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImagesProps[];
}

interface CarImagesProps {
  name: string;
  uid: string;
  url: string;
}

const Home = () => {
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));
      getDocs(queryRef)
        .then((snapshot) => {
          const listCars = [] as CarProps[];
          snapshot.forEach((doc) => {
            listCars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              price: doc.data().price,
              km: doc.data().km,
              city: doc.data().city,
              images: doc.data().images,
              uid: doc.data().uid,
            });
          });
          setCars(listCars);
        })
        .catch();
    }
    loadCars();
  }, []);

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 border-slate-400 rounded-lg h-9 px-3 outline-none"
          type="text"
          placeholder="Digite o nome do carro"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg cursor-pointer">
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo Brasil.
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length > 0 &&
          cars.map((car) => (
            <Link to={`/car/${car.id}`} key={car.id}>
              <section className="w-full bg-white rounded-lg">
                <img
                  className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                  src={car.images[0].url}
                  alt={car.name}
                />

                <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

                <div className="flex flex-col px-2">
                  <span className="text-zinc-500 mb-6">
                    Ano {car.year} | {car.km}KM{" "}
                  </span>
                  <strong className="text-black font-medium text-xl">
                    R$
                    {car.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>

                {/* Divisor */}
                <div className="w-full h-px bg-slate-200 my-2"></div>

                <div className="px-2 pb-2">
                  <span className="text-zinc-500">{car.city}</span>
                </div>
              </section>
            </Link>
          ))}
      </main>
    </Container>
  );
};

export default Home;
