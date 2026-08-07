import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../service/api"
import { CircleCheck, Pencil, RefreshCw, Trash2 } from "lucide-react"

interface DadosConvidado {
    id: number,
    nome_completo: string,
    email: string,
    telefone: string,
    CPF: string,
    mesaId: number
    check_in: boolean
}

interface DadosDashboard {
    total_convidados: number,
    confirmados: number,
    pendentes: number
}

const Dashboard = () => {

    const [convidado, setConvidado] = useState<DadosConvidado[]>([])
    const [idEditando, setEditando] = useState<number | null>(null)
    const [dashboard, setDashboard] = useState<DadosDashboard>({ total_convidados: 0, confirmados: 0, pendentes: 0 })

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DadosConvidado>()

    async function PDF() {
        window.print()
    }

    async function DadosDashboard() {
        try {
            const token = localStorage.getItem("@Wedding: token")
            console.log(token)
            const RespostaAPi = await api.get("/convidado/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setDashboard(RespostaAPi.data)
        } catch (error) {
            console.error("Falha ao Listar dados do Dashboard", error)
        }
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

            DadosDashboard()
            DadosConvidado()
            alert("Checkin Feito Com Sucesso")
        } catch (error) {
            console.error("Falha no checkin do Convidados", error)
            alert("Convidado já fez Checkin")
        }
    }
    async function desfazerCheckin(dados: DadosConvidado) {
        try {
            const token = localStorage.getItem("@Wedding: token")
            console.log(token)

            await api.patch(`/convidado/defazercheckin/${dados.id}`,null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            DadosDashboard()
            DadosConvidado()
            alert("Checkin Desfeito")
        } catch (error) {
            console.error("Falha no checkin do Convidados", error)
            alert("Convidado ainda não fez checkin")
        }
    }
    async function excluirConvidado(dados: DadosConvidado) {
        try {
            const token = localStorage.getItem("@Wedding: token")
            console.log(token)

            const resposta = window.confirm("Voce tem certeza que que excluir esse convidado?")
            if(!resposta){
                return
            }

            await api.delete(`/convidado/deletar/${dados.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            DadosDashboard()
            DadosConvidado()
            alert("Convidado Deletado")
        } catch (error) {
            console.error("Falha ao deletar Convidado", error)
            alert("Falha ao deletar Convidado")
        }
    }

    async function HandleConvidado(dados: DadosConvidado) {
        try {
            if(idEditando){
                const token = localStorage.getItem("@Wedding: token")
            await api.put(`/convidado/atualizar/${idEditando}`, dados, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert("Convidado Atualizado")
            }else{
                const token = localStorage.getItem("@Wedding: token")
                await api.post("/convidado/criar", dados, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                alert("Convidado Criado")
            }
            
            reset()
            DadosDashboard()
            DadosConvidado()
        } catch (error) {
            console.error("Falha ao Criar convidado.", error)
        }
    }

    function PuxarDados(ConvidadoSelecionado: DadosConvidado){
        console.log(idEditando)
        setEditando(ConvidadoSelecionado.id)
        console.log(idEditando)
            setValue(("nome_completo"), ConvidadoSelecionado.nome_completo)
            setValue(("email"), ConvidadoSelecionado.email)
            setValue(("CPF"), ConvidadoSelecionado.CPF)
            setValue(("telefone"), ConvidadoSelecionado.telefone)
            setValue(("mesaId"), ConvidadoSelecionado.mesaId)
        }

    function VoltarEditar(){
        setEditando(null)
        reset()
    }

    function Loading(){
        
        setTimeout(() => (
            <RefreshCw></RefreshCw>
        ), 1000);
    }

    function Sair(){
        localStorage.removeItem("@Wedding: token")
    }

    useEffect(() => {
        Loading
        DadosDashboard()
        DadosConvidado()

    }, [])

    return (
        <main className="bg-amber-100 min-h-screen">
            <nav className="flex justify-between items-center border-b-amber-400 border-2 h-20 p-2">
                <h1 className="text-5xl text-green-800">DASHBOARD: ADMIN</h1>
                <div className="flex gap-3">
                    <button onClick={()=>PDF()} className="bg-orange-700 text-white py-2 px-3 rounded-2xl text-2xl hover:bg-orange-600 cursor-pointer">EXPORTAR</button>
                    <button onClick={()=>Sair()} className="bg-orange-700 text-white py-2 px-12 rounded-2xl text-2xl hover:bg-orange-600 cursor-pointer">SAIR</button>
                </div>
            </nav>
            <section className="  px-50 flex justify-center gap-50 p-5">
                <div className="border border-t-7 rounded-2xl p-3 bg-amber-50 text-green-800 justify-center w-60 h-50 flex flex-col text-center">
                    <h1 className="text-3xl font-semibold">TOTAL DE CONVIDADOS</h1>
                    <h1 className="text-5xl py-3">{dashboard.total_convidados}</h1>
                </div>
                <div className="border border-t-7 rounded-2xl p-3 bg-amber-50 text-green-800 justify-center w-60 h-50 flex flex-col text-center">
                    <h1 className="text-3xl font-semibold">TOTAL DE CONFIRMADOS</h1>
                    <h1 className="text-5xl py-3">{dashboard.confirmados}</h1>
                </div>
                <div className="border border-t-7 rounded-2xl p-3 bg-amber-50 text-green-800 justify-center w-60 h-50 flex flex-col text-center">
                    <h1 className="text-3xl font-semibold">TOTAL DE PENDENTES</h1>
                    <h1 className="text-5xl py-3">{dashboard.pendentes}</h1>
                </div>
            </section>
            <section className="  px-50 flex justify-center gap-50 p-5">
                <form onSubmit={handleSubmit(HandleConvidado)} className={` border flex flex-col w-90 p-5 border-amber-400 rounded-2xl bg-amber-50`}>
                    <div className="text-center">
                        <h1 className="text-green-800 text-5xl">{idEditando ? "Atualizar" : "Criar Convidado"}</h1>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-green-800 text-4xl py-5" >Nome Completo</h1>
                        <input {...register("nome_completo", { required: "Nome Obrigatório" })} className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="text"  />
                        {errors.nome_completo && <span className="text-red-500">{errors.nome_completo.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-green-800 text-4xl py-5" >E-mail</h1>
                        <input {...register("email", { required: "E-mail Obrigatório" })} className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="email"  />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-green-800 text-4xl py-5" >Telefone</h1>
                        <input {...register("telefone", { required: "Telefone Obrigatório" })} className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="text"  />
                        {errors.telefone && <span className="text-red-500">{errors.telefone.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-green-800 text-4xl py-5" >Cpf</h1>
                        <input {...register("CPF", { required: "Cpf Obrigatória" })} className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="text"/>
                        {errors.CPF && <span className="text-red-500">{errors.CPF.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-green-800 text-4xl py-5" >Mesa</h1>
                        <input {...register("mesaId", { required: "Mesa Obrigatória", valueAsNumber: true })} className="bg-amber-50 text-[20px] p-2 border-2 rounded-2xl border-amber-400" type="number" />
                        {errors.mesaId && <span className="text-red-500">{errors.mesaId.message}</span>}
                    </div>
                    <div className="flex flex-col py-4">
                        <button className="bg-orange-700 text-white py-2 rounded-2xl text-2xl hover:bg-orange-600 cursor-pointer">
                            {idEditando ? "Atualizar" : "Criar Convidado"}
                        </button>
                    </div>
                    {idEditando && (
                        <div className="flex flex-col py-4">
                        <button onClick={()=>VoltarEditar()} className="bg-orange-700 text-white py-2 rounded-2xl text-2xl hover:bg-orange-600 cursor-pointer">
                            Voltar
                        </button>
                    </div>
                    )}
                </form>
                <div>
                <table>
                    <thead>
                        <tr className="border">
                            <th className="bg-green-800 p-2 text-center text-amber-50">Nome Completo</th>
                            <th className="bg-green-800 p-2 text-center text-amber-50">Dados</th>
                            <th className="bg-green-800 p-2 text-center text-amber-50">Mesa</th>
                            <th className="bg-green-800 p-2 text-center text-amber-50">Status</th>
                            <th className="bg-green-800 p-2 text-center text-amber-50">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {convidado.map((c)=>(
                        <tr key={c.id}>
                            <td className="bg-white p-2 text-center text-green-800 font-semibold">{c.nome_completo}</td>
                            <td className="bg-white p-2 text-center text-green-800 font-semibold">
                                <div className="flex text-center">
                                    {c.email} {c.telefone}
                                </div></td>
                            <td className="bg-white p-2 text-center text-green-800 font-semibold">{c.mesaId}</td>
                            <td className="bg-white p-2 text-center text-green-800 font-semibold">{c.check_in ? "CONFIRMADO" : "PENDENTE"}</td>
                            <td className="bg-white p-2 text-center text-green-800 font-semibold">
                                <div className="flex gap-2">
                                    <Pencil onClick={()=>PuxarDados(c)} className="cursor-pointer"></Pencil>
                                    <Trash2 onClick={()=>excluirConvidado(c)} className="cursor-pointer"></Trash2>
                                    <CircleCheck className="cursor-pointer" onClick={()=>Checkin(c)}></CircleCheck>
                                    <RefreshCw onClick={()=>desfazerCheckin(c)} className="cursor-pointer"></RefreshCw>
                                </div>
                                </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </section>
        </main>
    )
}

export default Dashboard