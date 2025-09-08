import { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import Container from "../../components/container";
import VehicleCard from "../../components/VehicleCard";

export interface CarProps {
  id: string;
  name: string;
  model: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  whatsapp: string;
  description: string;
  images: CarImagesProps[];
  created: string;
  owner: string;
}

interface CarImagesProps {
  name: string;
  uid: string;
  url: string;
}

const Home = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
              model: doc.data().model,
              year: doc.data().year,
              price: doc.data().price,
              km: doc.data().km,
              city: doc.data().city,
              whatsapp: doc.data().whatsapp,
              description: doc.data().description,
              images: doc.data().images,
              uid: doc.data().uid,
              created: doc.data().created,
              owner: doc.data().owner,
            });
          });
          setCars(listCars);
          setLoading(false);
        })
        .catch();
    }
    loadCars();
  }, []);

  return (
    <Container>
      {loading && <p>Loading...</p>}
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
        {!loading &&
          cars.length > 0 &&
          cars.map((car) => <VehicleCard key={car.id} car={car} />)}
      </main>
    </Container>
  );
};

export default Home;
