import {Panel} from "primereact/panel";
import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import {Button} from "primereact/button";

interface FiltrosClientesProps {
    onFiltrar: (filtros: {
        nome: string,
        email: string,
    }) => void;
    onLimpar: () => void;
}

export default function FiltrosClientes({onFiltrar, onLimpar}:
    FiltrosClientesProps) {

    const [nomeCliente, setNomeCliente] = useState<string>('');
    const [emailCliente, setEmailCliente] = useState<string>('');

    const filtrosAtivos = (): boolean => {
        return !!(
            nomeCliente.trim() ||
            emailCliente.trim()
        );
    };

    const handleFiltrar = () => {
        onFiltrar({
            nome: nomeCliente,
            email: emailCliente
        });
    };

    const handleLimpar = () => {
        setNomeCliente('');
        setEmailCliente('');
        onLimpar();
    };


    return (
        <section>
            <Panel className="mb-5" header="Filtros">
                <form
                    className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFiltrar();
                    }}
                >
                    <div>
                        <p className="mb-2">Nome</p>
                        <InputText
                            type="text"
                            className="w-full"
                            placeholder="Buscar por nome"
                            value={nomeCliente}
                            onChange={(e) => setNomeCliente(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className="mb-2">E-mail</p>
                        <InputText
                            type="text"
                            className="w-full"
                            placeholder="Buscar por e-mail"
                            value={emailCliente}
                            onChange={(e) => setEmailCliente(e.target.value)}
                        />
                    </div>
                </form>

                <div className="flex gap-3 justify-end">
                    {filtrosAtivos() && (
                        <Button
                            severity="secondary"
                            label="Limpar"
                            icon="pi pi-trash"
                            onClick={handleLimpar}
                        />
                    )}
                    <Button
                        label="Filtrar"
                        icon="pi pi-search"
                        onClick={handleFiltrar}
                    />
                </div>
            </Panel>
        </section>
    )
}