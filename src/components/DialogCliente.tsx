import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Cliente} from "@/types/Cliente";

interface DialogClienteProps {
    displayDialog: boolean;
    setDisplayDialog: (value: boolean) => void;
    cliente: Cliente;
    setCliente: (cliente: Cliente) => void;
    isEdit: boolean;
    resetarForm: () => void;
    salvarCliente: () => Promise<void>;
}


const DialogCliente = ({
   displayDialog,
   setDisplayDialog,
   cliente,
   setCliente,
   isEdit,
   resetarForm,
   salvarCliente
}: DialogClienteProps) => {
    return (
        <Dialog
            header={isEdit ? "Editar Cliente" : "Novo Cliente"}
            visible={displayDialog}
            onHide={() => {
                setDisplayDialog(false);
                if (!isEdit) {
                    resetarForm();
                }
            }}
        >
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
    )
}

export default DialogCliente;