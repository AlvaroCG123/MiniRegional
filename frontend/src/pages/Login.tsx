import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../service/api"

interface HandleForm {
    email: string,
    senha: string
}

const Login = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }} = useForm<HandleForm>()

    async function HandleLogin(dados: HandleForm) {
        try {
            const RespostaApi = await api.post("/usuario/login", dados)
            const usuarioCargo = RespostaApi.data.usuario.cargo
            
            localStorage.setItem("@Wedding: token", RespostaApi.data.token)
            localStorage.setItem("@Wedding: cargo", RespostaApi.data.usuario.cargo)
            if(usuarioCargo === 'ADMIN'){
                navigate("/dashboard")
            }else if(usuarioCargo === 'CERIMONIALISTA'){
                navigate("/cerimonialista")
            }
        } catch (error) {
            console.error("Falha no login: ", error)
            alert("Falha no login: Email ou Senha invalido")
        }
    }

  return (
    <main className="bg-amber-100 min-h-screen flex justify-center items-center">
        <div className=" flex flex-col gap-10">
            <div className="flex justify-center">
            <h1 className="text-5xl border-b-2 border-amber-400 text-green-800">WEDDING PASS</h1>
            </div>
            <form onSubmit={handleSubmit(HandleLogin)} className="border flex flex-col w-90 p-5 border-amber-400 rounded-2xl bg-amber-50">
                <div className="text-center">
                    <h1 className="text-green-800 text-5xl">Login</h1>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-green-800 text-4xl py-5" >E-mail</h1>
                    <input {...register("email", {required:"E-mail Obrigatório"})} className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="email" p-2 />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-green-800 text-4xl py-5" >Senha</h1>
                    <input {...register("senha", {required:"Senha Obrigatória"})} className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="password" p-2 />
                 {errors.senha && <span className="text-red-500">{errors.senha.message}</span>}
                </div>
                <div className="flex flex-col py-4">
                    <button className="bg-orange-700 text-white py-2 rounded-2xl text-2xl hover:bg-green-700 cursor-pointer">Entrar</button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Login