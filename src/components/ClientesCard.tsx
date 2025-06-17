import {useEffect, useState} from "react";
import {Cliente} from "@/types/Cliente";
import clientesService from "@/services/clientesService";
import DialogCliente from "@/components/DialogCliente";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


interface ClienteCardProps {
    displayDialog: boolean;
    setDisplayDialog: (displayDialog: boolean) => void;
    isNovoCliente: boolean;
    setIsNovoCliente: (isNewClient: boolean) => void;
    clientes: Cliente[];
    onClientesChange: () => void;
}

const ClientesCard = ({
    displayDialog,
    setDisplayDialog,
    isNovoCliente,
    setIsNovoCliente,
    clientes,
    onClientesChange
}: ClienteCardProps) => {
    const [cliente, setCliente] = useState<Cliente>({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: {
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: ''
        }
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        if (isNovoCliente && displayDialog) {
            resetarForm();
            setIsNovoCliente(false);
        }
    }, [isNovoCliente, displayDialog]);


    const resetarForm = () => {
        setCliente({
            nome: '',
            email: '',
            telefone: '',
            cpf: '',
            endereco: {
                cep: '',
                rua: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: ''
            }
        });
        setIsEdit(false);
    }

    const salvarCliente = async () => {
        try {
            if (isEdit) {
                await clientesService.updateCliente(cliente);
                setDisplayDialog(false);
            } else {
                await clientesService.createCliente(cliente);
                resetarForm();
                setDisplayDialog(false);
            }
            onClientesChange();
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
        }
    }

    const confirmarDelete = (cliente: Cliente) => {
        confirmDialog({
            message: `Tem certeza que deseja excluir o cliente "${cliente.nome}"?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptClassName: 'p-button-danger',
            accept: () => cliente.id && deletarCliente(cliente.id),
            reject: () => {}
        });
    };


    const deletarCliente = async (id: number) => {
        try {
            await clientesService.deleteCliente(id);
            onClientesChange();
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clientes.map(cliente => (
                <div key={cliente.id} className="p-6 m-auto md:m-0 bg-white shadow-lg rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-xl mr-4 md:m-0">
                            {cliente.nome}
                        </span>
                        <div className="flex">
                        <span className="mr-4 border border-gray-300 rounded p-2 cursor-pointer"
                              onClick={() => {
                                  setCliente(cliente);
                                  setIsEdit(true);
                                  setDisplayDialog(true);
                              }}>
                                <i className="pi pi-pen-to-square"></i>
                            </span>

                            <span className="border border-gray-300 rounded p-2 cursor-pointer"
                                  onClick={() => confirmarDelete(cliente)}>
                                <i className="pi pi-trash" style={{color: 'red'}}></i>
                            </span>
                        </div>
                    </div>
                    <div className="flex sm:flex-wrap justify-between">
                        <div className="flex flex-col">
                        <span className="mt-2 text-gray-600">
                            {cliente.cpf}
                        </span>
                            <span className="mt-2">
                            <i className="pi pi-envelope"></i>
                            <span className="ml-2 text-gray-600">
                                {cliente.email}
                            </span>
                        </span>

                            <span className="mt-2">
                                <i className="pi pi-phone"></i>
                                <span className="ml-2 text-gray-600">{cliente.telefone}</span>
                            </span>

                            <span className="mt-2 w-52 flex items-start">
                                <i className="pi pi-map-marker"></i>
                                <span className="ml-2 text-gray-600">
                                    {`${cliente.endereco.rua}, ${cliente.endereco.numero} 
                                    ${cliente.endereco.bairro} - ${cliente.endereco.cidade}/${cliente.endereco.estado} 
                                    CEP: ${cliente.endereco.cep}`}
                                </span>
                            </span>

                            <div className="border border-gray-600 rounded my-2"></div>

                            <div className="">
                                <span className="mr-2">
                                    <i className="pi pi-file"></i>
                                </span>
                                <span className="font-semibold">Histórico de Pedidos</span>

                                {cliente.pedidos && cliente.pedidos.length > 0 ? (
                                    <>
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600">Total de pedidos:</span>
                                                <span>{cliente.pedidos.length}</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-gray-600">Pedidos concluídos:</span>
                                                <span>
                                                    {cliente.pedidos.filter(pedido => pedido.status === 'Concluído').length}
                                                </span>
                                            </div>

                                            </div>
                                                <div className="mt-3 flex flex-col">
                                                    <span className="text-gray-600">Total gasto:</span>
                                                    <span className="font-bold">
                                                        <p style={{color: 'green', fontSize: '20px'}}>
                                                            {`R$ ${cliente.pedidos
                                                                .reduce((total, pedido) => total + pedido.valorTotal, 0)
                                                                .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                                                        </p>
                                                    </span>
                                                </div>

                                                <div className="mt-3">
                                                    <span className="text-gray-600">Últimos pedidos: </span>
                                                        {cliente.pedidos.map(pedido => (
                                                            <div key={pedido.id} className="mt-2">
                                                                <div className="text-gray-600">Loja: {pedido.loja}</div>
                                                                <div className="flex justify-between items-center w-full">
                                                                    <div className="mt-1">
                                                                        <span className="text-sm">Pedido #{pedido.id}</span>
                                                                        <div className="text-xs text-gray-500">
                                                                            {pedido.produtos.map(produto => (
                                                                                <div key={produto.id}>
                                                                                    {produto.quantidade}x {produto.nome} -
                                                                                    R$ {produto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <span className={`${
                                                                            pedido.status === 'Concluído'
                                                                                ? 'bg-gray-800'
                                                                                : 'bg-orange-500'
                                                                            } text-white px-2 py-1 rounded-full text-sm`}>
                                                                            {pedido.status}
                                                                        </span>
                                                                        <span className="ml-2 text-sm">
                                                                            R$ {pedido.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                    </>
                                ) : (
                                    <div className="mt-2 text-gray-500">
                                        Nenhum pedido realizado
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <DialogCliente
                displayDialog={displayDialog}
                setDisplayDialog={setDisplayDialog}
                cliente={cliente}
                setCliente={setCliente}
                isEdit={isEdit}
                resetarForm={resetarForm}
                salvarCliente={salvarCliente}
            />

            <ConfirmDialog />
        </div>
    )
}

export default ClientesCard;