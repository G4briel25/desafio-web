import {useEffect, useState} from "react";
import {Cliente} from "@/types/Cliente";
import { Dialog } from 'primereact/dialog';
import clientesService from "@/services/clientesService";
import {InputText} from "primereact/inputtext";

const ClientesCard = () => {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [displayDialog, setDisplayDialog] = useState<boolean>(false);
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

    const loadClientes = async () => {
        try {
            const data = await clientesService.getClientes();
            setClientes(data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    }

    useEffect(() => {
        loadClientes();
    }, []);

    const salvarCliente = async () => {
        try {
            if (isEdit) {
                await clientesService.updateCliente(cliente);
            } else {
                await clientesService.createCliente(cliente);
            }
            setDisplayDialog(false);
            await loadClientes();
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
        }
    }

    const deletarCliente = async (id: number) => {
        try {
            await clientesService.deleteCliente(id);
            await loadClientes();
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    }

    const resetarForm = () => {
        setClientes({
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

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="p-6 m-auto md:m-0 bg-white shadow-lg rounded-lg">
                <div className="flex justify-between items-center">
                        <span className="font-bold text-xl mr-4 md:m-0">
                            Gabriel Jaune Ribera
                        </span>
                    <div className="flex">
                        <span className="mr-4 border border-gray-300 rounded p-2 cursor-pointer"
                              onClick={() => setDisplayDialog(true)}>
                            <i className="pi pi-pen-to-square"></i>
                        </span>
                        <span className="border border-gray-300 rounded p-2 cursor-pointer"
                              onClick={() => deletarCliente(1)}>
                            <i className="pi pi-trash" style={{color: 'red'}}></i>
                        </span>
                    </div>
                </div>
                <div className="flex sm:flex-wrap justify-between">
                    <div className="flex flex-col">
                        <span className="mt-2 text-gray-600">
                            123.456.159-52
                        </span>
                        <span className="mt-2">
                            <i className="pi pi-envelope"></i>
                            <span className="ml-2 text-gray-600">
                                gabriel@email.com
                            </span>
                        </span>

                        <span className="mt-2">
                            <i className="pi pi-phone"></i>
                            <span className="ml-2 text-gray-600">95 1489-7925</span>
                        </span>

                        <span className="mt-2 w-52 flex items-start">
                            <i className="pi pi-map-marker"></i>
                            <span className="ml-2 text-gray-600">Rua das Flores, 123 Centro - São Paulo/SP CEP: 01234-567</span>
                        </span>

                        <div className="border border-gray-600 rounded my-2"></div>

                        <div className="">
                            <span className="mr-2">
                                <i className="pi pi-file"></i>
                            </span>
                            <span className="font-semibold">Histórico de Pedidos</span>

                            <div className="mt-2">
                                <span className="text-gray-600">Loja: Centro</span>
                            </div>

                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                    <span className="text-gray-600">Total de pedidos:</span>
                                    <span>1</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-gray-600">Pedidos concluídos:</span>
                                    <span>2</span>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-col">
                                <span className="text-gray-600">Total gasto:</span>
                                <span className="font-bold">
                            <p style={{color: 'green', fontSize: '20px'}}>R$ 1.299,90</p>
                        </span>
                            </div>

                            <div className="mt-3">
                                <span className="text-gray-600">Últimos pedidos: </span>
                                <div className="flex justify-between items-center w-full">
                                    <div className="mt-1">
                                        <span className="text-sm">Pedido #1</span>
                                    </div>

                                    <div>
                                        <span
                                            className="bg-gray-800 text-white px-2 py-1 rounded-full text-sm">Concluído</span>
                                        <span className="ml-2 text-sm">R$ 1.299,90</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog header="Novo Cliente" visible={displayDialog} onHide={() => setDisplayDialog(false)}>
                <form>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="">
                            <label>Nome *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.nome}
                                onChange={(e) => setCliente({...cliente, nome: e.target.value})}
                            />
                        </div>

                        <div>
                            <label>E-mail *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.email}
                                onChange={(e) => setCliente({...cliente, email: e.target.value})}
                            />
                        </div>

                        <div>
                            <label>Telefone *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.telefone}
                                onChange={(e) => setCliente({...cliente, telefone: e.target.value})}
                            />
                        </div>

                        <div>
                            <label>CPF/CNPJ *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.cpf}
                                onChange={(e) => setCliente({...cliente, cpf: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="mt-5 mb-2 font-bold">
                        <span>Endereço</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label>CEP *</label>
                            <InputText
                                type="text"
                                className="h-10"
                                style={{width: '250px'}}
                                value={cliente.endereco.cep}
                                onChange={(e) => setCliente({...cliente, endereco: {...cliente.endereco, cep: e.target.value}})}
                            />
                        </div>

                        <div>
                            <label>Rua *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.endereco.rua}
                                onChange={(e) => setCliente({...cliente, endereco: {...cliente.endereco, rua: e.target.value}})}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Número *</label>
                            <InputText
                                type="text"
                                className="h-10"
                                style={{width: '250px'}}
                                value={cliente.endereco.numero}
                                onChange={(e) => setCliente({...cliente, endereco: {...cliente.endereco, numero: e.target.value}})}
                            />
                        </div>

                        <div>
                            <label>Bairro *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.endereco.bairro}
                                onChange={(e) => setCliente({...cliente, endereco: {...cliente.endereco, bairro: e.target.value}})}
                            />
                        </div>

                        <div>
                            <label>Cidade *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.endereco.cidade}
                                onChange={(e) => setCliente({...cliente, endereco: {...cliente.endereco, cidade: e.target.value}})}
                            />
                        </div>

                        <div>
                            <label>Estado *</label>
                            <InputText
                                type="text"
                                className="w-full h-10"
                                value={cliente.endereco.estado}
                                onChange={(e) => setCliente({...cliente, endereco: {...cliente.endereco, estado: e.target.value}})}
                            />
                        </div>
                    </div>
                </form>

                <div className="flex justify-end mt-5">
                    <div className="border border-gray-400 p-2 rounded-md mr-3 cursor-pointer"
                        onClick={() => setDisplayDialog(false)}
                    >
                        Cancelar
                    </div>
                    <div className="bg-gray-800 text-white p-2 rounded-md cursor-pointer"
                         onClick={salvarCliente}
                    >
                        Salvar
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ClientesCard;