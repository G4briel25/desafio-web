import {Panel} from "primereact/panel";
import {InputText} from "primereact/inputtext";
import React from "react";
import {Button} from "primereact/button";

export default function FiltrosClientes() {
    return (
        <section>
            <Panel className="mb-5" header="Filtros">
                <form
                    className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <div>
                        <p className="mb-2">Nome</p>
                        <InputText
                            type="text"
                            className="w-full"
                            placeholder="Buscar por nome"
                        />
                    </div>

                    <div>
                        <p className="mb-2">E-mail</p>
                        <InputText
                            type="text"
                            className="w-full"
                            placeholder="Buscar por e-mail"
                        />
                    </div>
                </form>

                <div className="flex gap-3 justify-end">
                    <Button
                        severity="secondary"
                        label="Limpar"
                        icon="pi pi-trash"
                    />
                    <Button
                        label="Filtrar"
                        icon="pi pi-search"
                    />
                </div>
            </Panel>
        </section>
    )
}