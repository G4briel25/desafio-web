'use client';

import React from "react";
import FiltrosClientes from "@/components/FiltrosClientes";
import {Paginator} from "primereact/paginator";
import ClientesCard from "@/components/ClientesCard";
import CabecalhoClientes from "@/components/CabecalhoClientes";

export default function clientes() {
    return(
        <main role="main" aria-label="Página principal dos clientes">

            <CabecalhoClientes
                titulo={"Clientes"}
                icone={"pi pi-users"}
                descricao={"Gerencie seus clientes e acompanhe o histórico de pedidos"}
                clicked={() => alert('Novo cliente')}
            />

            <FiltrosClientes

            />

            <section role="region" aria-labelledby="Listagem de clientes">
                <span className="block font-semibold mb-4">
                  Resultados:  produto(s) encontrado(s).
                </span>
                <ClientesCard/>
            </section>

            <footer role="contentinfo" aria-label="Paginação">
                <Paginator
                    aria-label="Controles de paginação"
                    first={5}
                    rows={2}
                    rowsPerPageOptions={[5, 10, 20]}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    className="border-round-xl"
                />
            </footer>

        </main>
    );
};