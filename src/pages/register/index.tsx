import { Link, useNavigate } from "react-router";
import imgLogo from "../../assets/logo.svg";
import Container from "../../components/container";
import Input from "../../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";

// zod schema for form validation
const schema = z.object({
  name: z.string().nonempty("O campo Nome é obrigatorio"),
  email: z
    .email("Insira um email valido")
    .nonempty("O campo email é obrigatorio"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });
        console.log("cadastrado com sucesso");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log("erro ao cadastrar usuario!");
        console.log(error);
      });
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img className="w-full" src={imgLogo} alt="Logo do site" />
        </Link>

        <form
          className="bg-white max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
              error={errors?.name?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              error={errors?.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              name="password"
              placeholder="Digite sua Senha"
              error={errors?.password?.message}
              register={register}
            />
          </div>

          <button
            className="bg-zinc-900 text-white w-full rounded-md h-11 font-medium"
            type="submit"
          >
            Acessar
          </button>
        </form>
        <Link to="/login" className="underline text-zinc-500">
          Já possui uma conta? faça o login!
        </Link>
      </div>
    </Container>
  );
};

export default Register;
