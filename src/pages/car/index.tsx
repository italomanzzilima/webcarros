import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Container from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import type { CarProps } from "../home";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Swiper, SwiperSlide } from "swiper/react";

const CarDetail = () => {
  const [car, setCar] = useState<CarProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCar() {
      if (!id) return;
      const docRef = doc(db, "cars", id);
      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.data()) {
            navigate("/");
            return;
          }
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
  }, [id, navigate]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {car && (
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {car.images.map((image) => (
            <SwiperSlide key={image.name}>
              <img
                className="w-full h-96 object-cover"
                src={image.url}
                alt="imagem do carro"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

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
            href={`https://api.whatsapp.com/send?phone=${car.whatsapp}&text=Olá vi esse ${car.name} no site WebCarros e fiquei interessado`}
            target="_blank"
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
