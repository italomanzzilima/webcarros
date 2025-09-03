import { Link, useNavigate } from "react-router";
import imgLogo from "../../assets/logo.svg";
import Container from "../../components/container";
import Input from "../../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useEffect } from "react";
import Button from "../../components/Button";

const schema = z.object({
  email: z
    .email("Insira um email valido")
    .nonempty("O campo email é obrigatorio"),
  password: z.string().nonempty("O campo senha é obrigatorio"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
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

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("logado com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log("erro ao logar usuario!");
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
          <Button type="submit">Acessar</Button>
        </form>

        <Link to="/register" className="underline text-zinc-500">
          Ainda não possui uma conta? cadastre-se!
        </Link>
      </div>
    </Container>
  );
};

export default Login;
