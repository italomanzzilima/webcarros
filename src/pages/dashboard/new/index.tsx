import { FiUpload } from "react-icons/fi";
import Container from "../../../components/container";
import DashboardHeader from "../../../components/panelHeader";
import Input from "../../../components/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/Button";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatorio"),
  model: z.string().nonempty("O modelo é obrigatorio"),
  year: z.string().nonempty("O ano do carro é obrigatorio"),
  km: z.string().nonempty("O km do carro é obrigatorio"),
  price: z.string().nonempty("O preço é obrigatorio"),
  city: z.string().nonempty("A cidade é obrigatoria"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatorio")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      error: "Numero de telefone invalido!",
    }),
  description: z.string().nonempty("A descricão é obrigatoria"),
});

type FormData = z.infer<typeof schema>;

const NewCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <DashboardHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32">
          <div className="cursor-pointer absolute">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="mb-3 font-medium">
              Nome do carro
            </label>
            <Input
              type="text"
              name="name"
              placeholder="ex.Onix"
              register={register}
              error={errors.name?.message}
            />
          </div>

          {/* Model */}
          <div className="mb-3">
            <label htmlFor="model" className="mb-3 font-medium">
              Modelo do carro
            </label>
            <Input
              type="text"
              name="model"
              placeholder="ex. 1.0 flex plus"
              register={register}
              error={errors.model?.message}
            />
          </div>

          {/* Year and KM */}
          <div className="w-full mb-3 flex gap-4 items-center">
            <div className="w-full">
              <label htmlFor="model" className="mb-3 font-medium">
                Ano
              </label>
              <Input
                type="text"
                name="year"
                placeholder="ex. 2020"
                register={register}
                error={errors.year?.message}
              />
            </div>
            <div className="w-full">
              <label htmlFor="model" className="mb-3 font-medium">
                KM rodados
              </label>
              <Input
                type="text"
                name="km"
                placeholder="ex. 10000 KM"
                register={register}
                error={errors.km?.message}
              />
            </div>
          </div>

          {/* phone and city */}
          <div className="w-full mb-3 flex gap-4 items-center">
            <div className="w-full">
              <label htmlFor="model" className="mb-3 font-medium">
                Telefone / WhatsApp
              </label>
              <Input
                type="text"
                name="whatsapp"
                placeholder="ex. (67)92020-5235"
                register={register}
                error={errors.whatsapp?.message}
              />
            </div>
            <div className="w-full">
              <label htmlFor="model" className="mb-3 font-medium">
                Cidade
              </label>
              <Input
                type="text"
                name="city"
                placeholder="ex. São paulo - SP"
                register={register}
                error={errors.city?.message}
              />
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <label htmlFor="model" className="mb-3 font-medium">
              Preço em R$
            </label>
            <Input
              type="text"
              name="price"
              placeholder="ex. 69000"
              register={register}
              error={errors.price?.message}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="model" className="mb-3 font-medium">
              Descrição
            </label>
            <textarea
              className="border-2 border-slate-400 w-full rounded-md h-24 px-2"
              {...register("description")}
              id="description"
              name="description"
              placeholder="Digite a descrição do carro."
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
      </div>
    </Container>
  );
};

export default NewCar;
