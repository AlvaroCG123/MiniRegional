import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../service/api"

interface DadosConvidado {
    id: number,
    nome_completo: string,
    email: string,
    telefone: string,
    CPF: string,
    mesaId: number
    check_in: boolean
}

const Cerimonialista = () => {
  
    const [convidado, setConvidado] = useState<DadosConvidado[]>([])

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DadosConvidado>()

    async function PDF() {
        window.print()
    }

    async function DadosConvidado() {
        try {
            const token = localStorage.getItem("@Wedding: token")
            console.log(token)
            const RespostaAPi = await api.get("/convidado/listar", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setConvidado(RespostaAPi.data)
            console.log(RespostaAPi.data)
        } catch (error) {
            console.error("Falha ao Listar Convidados", error)
        }
    }

    async function Checkin(dados: DadosConvidado) {
        try {
            const token = localStorage.getItem("@Wedding: token")
            console.log(token)

            await api.patch(`/convidado/checkin/${dados.id}`,null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            DadosConvidado()

            alert("Checkin Feito Com Sucesso")
        } catch (error) {
            console.error("Falha no checkin do Convidados", error)
        }
    }

    async function HandleConvidado(dados: DadosConvidado) {
        try {
            
        } catch (error) {
            console.error("Falha ao Criar convidado.", error)
        }
    }

    function Loading(){
        
        setTimeout(() => (
            <h1>Oie</h1>
        ), 1000);
    }

    function Sair(){
        localStorage.removeItem("@Wedding: token")
    }

    useEffect(() => {
        DadosConvidado()
        Loading()
    }, [])

    return (
        <main className="bg-amber-100 min-h-screen min-w-screen">
            <nav className="flex justify-between items-center border-b-amber-400 border-2 h-20 p-2">
                <h1 className="text-5xl text-green-800">DASHBOARD: CONVIDADO</h1>
                <div className="flex gap-3">
                    <button onClick={()=>PDF()} className="bg-orange-700 text-white py-2 px-3 rounded-2xl text-2xl hover:bg-orange-600 cursor-pointer">EXPORTAR</button>
                    <button onClick={()=>Sair()} className="bg-orange-700 text-white py-2 px-12 rounded-2xl text-2xl hover:bg-orange-600 cursor-pointer">SAIR</button>
                </div>
            </nav>
            <section className=" px-50 flex flex-col items-center gap-5 p-5">
                <div className="">
                    <input className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="password"/>
                </div>
                
                {convidado.map((c)=>(
                <div key={c.id} className="bg-amber-50 border-3 border-amber-400 px-5 w-125 rounded-3xl">
                    <h1 className="text-3xl text-green-800 font-bold py-4">{c.nome_completo}</h1>
                    <div className="flex pb-3 justify-between">
                        <h1 className="text-3xl text-green-800 font-semibold">
                        Mesa: {c.mesaId}
                        </h1>
                        <div>
                            <h1 className="text-3xl text-green-800 font-semibold">
                                ( 1 / 6 )
                            </h1>
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        <h1 className="text-2xl text-green-800 font-semibold">status:</h1>
                        
                        <h1 className={`text-2xl text-green-800 font-semibold ${c.check_in ? "text-green-600" : "text-red-600"}`}>
                         {c.check_in ? "CONFIRMADO" : "PENDENTE"} 
                        </h1>
                    </div>
                    <div className="flex flex-col py-4">
                        <button onClick={()=>Checkin(c)} className={` text-white py-4 rounded-2xl text-4xl font-semibold 
                            ${c.check_in ? "bg-gray-700 cursor-no-drop" : "bg-orange-700 hover:bg-orange-600 cursor-pointer"}
                            `}>
                            {c.check_in ? "Entrou" : "Check-In"}
                        </button>
                    </div>
                </div>
                ))}
            </section>
        </main>
  )
}

export default Cerimonialista