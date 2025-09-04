import { Link } from "react-router";
import type { CarProps } from "../../pages/home";
import { useState } from "react";

interface VehicleCardProps {
  car: CarProps;
}

const VehicleCard = ({ car }: VehicleCardProps) => {
  const [loadingImages, setLoadingImages] = useState<string[]>([]);

  function handleLoadImage(id: string) {
    setLoadingImages((prevImages) => [...prevImages, id]);
  }

  return (
    <section className="w-full bg-white rounded-lg">
      <div
        className="w-full h-72 bg-slate-300 rounded-lg"
        style={{
          display: loadingImages.includes(car.id) ? "none" : "block",
        }}
      ></div>

      <img
        className="w-full rounded-lg mb-2 max-h-72"
        src={car.images[0].url}
        alt={car.name}
        onLoad={() => handleLoadImage(car.id)}
        style={{
          display: loadingImages.includes(car.id) ? "block" : "none",
        }}
      />

      <Link to={`/car/${car.id}`} className="font-bold mt-1 mb-2 px-2">
        {car.name}
      </Link>

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
  );
};

export default VehicleCard;
