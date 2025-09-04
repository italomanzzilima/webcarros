import { useState, useEffect, useContext } from "react";
import Container from "../../components/container";
import DashboardHeader from "../../components/panelHeader";
import { FiTrash2 } from "react-icons/fi";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, deleteObject } from "firebase/storage";
import type { CarProps } from "../home";
import { AuthContext } from "../../contexts/auth/AuthContext";
import VehicleCard from "../../components/VehicleCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return;
      }
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

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
  }, [user]);

  async function handleDeleteCar(car: CarProps) {
    const docRef = doc(db, "cars", car.id);

    car.images.map(async (image) => {
      const imagesPath = `image/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagesPath);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.log("error: ", error);
      }
    });

    await deleteDoc(docRef);

    setCars(cars.filter((item) => item.id !== car.id));
  }

  return (
    <Container>
      <DashboardHeader />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length > 0 &&
          cars.map((car) => (
            <div className="relative" key={car.id}>
              <button
                className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center cursor-pointer right-2 top-2 drop-shadow"
                onClick={() => handleDeleteCar(car)}
              >
                <FiTrash2 size={26} color="#000" />
              </button>
              <VehicleCard car={car} />
            </div>
          ))}
      </main>
    </Container>
  );
};

export default Dashboard;
