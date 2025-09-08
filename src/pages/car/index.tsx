import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import type { CarProps } from "../home";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

const CarDetail = () => {
  const [car, setCar] = useState<CarProps>();
  const { id } = useParams();

  useEffect(() => {
    async function loadCar() {
      if (!id) return;
      const docRef = doc(db, "cars", id);
      getDoc(docRef)
        .then((snapshot) => {
          setCar({
            id: snapshot?.id,
            name: snapshot.data()?.name,
            model: snapshot.data()?.model,
            year: snapshot.data()?.year,
            price: snapshot.data()?.price,
            km: snapshot.data()?.km,
            city: snapshot.data()?.city,
            whatsapp: snapshot.data()?.whatsapp,
            description: snapshot.data()?.description,
            images: snapshot.data()?.images,
            uid: snapshot.data()?.uid,
            created: snapshot.data()?.created,
            owner: snapshot.data()?.owner,
          });
        })
        .catch((error) => console.log(error));
    }
    loadCar();
  }, [id]);

  return (
    <Container>
      <h1>Pagina CarDetail</h1>
      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="text-xl sm:text-3xl font-bold">{car?.name}</h1>
            <h1 className="text-xl sm:text-3xl font-bold">
              R$
              {car?.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h1>
          </div>
          <p>{car?.model}</p>
          <div className="flex w-full gap-6 my-4">
            <div className="flex gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
              <div>
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>

          <strong>Descrição:</strong>
          <p>{car?.description}</p>

          <strong>Telefone / WhatsApp</strong>
          <p>{car?.whatsapp}</p>

          <a
            href=""
            className="bg-green-500 w-full text-white font-bold h-12 my-6 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Conversar com vendedor
            <FaWhatsapp size={26} color="#FFF" />
          </a>
        </main>
      )}
    </Container>
  );
};

export default CarDetail;
