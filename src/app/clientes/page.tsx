'use client';

import React, {useEffect, useState} from "react";
import FiltrosClientes from "@/components/FiltrosClientes";
import {Paginator} from "primereact/paginator";
import ClientesCard from "@/components/ClientesCard";
import CabecalhoClientes from "@/components/CabecalhoClientes";
import clientesService from "@/services/clientesService";
import {Cliente} from "@/types/Cliente";
import LazyLoading from "@/components/LazyLoading";

export default function Clientes() {

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);

    const getClientesAtuais = () => {
        return clientesFiltrados.slice(first, first + rows);
    };

    const loadClientes = async () => {
        try {
            setLoading(true);
            const data = await clientesService.getClientes();
            setClientes(data);
            setClientesFiltrados(data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 900);
        }
    };

    useEffect(() => {
        loadClientes();
    }, []);

    const onPageChange = (event: { first: number; rows: number; }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const [displayDialog, setDisplayDialog] = useState<boolean>(false);
    const [isNovoCliente, setIsNovoCliente] = useState<boolean>(false);

    const handleNovoCliente = () => {
        setIsNovoCliente(true);
        setDisplayDialog(true);
    };

    const handleFiltrar = (filtros: { nome: string; email: string }) => {
        const filtrados = clientes.filter(cliente => {
            const nomeMatch = filtros.nome ?
                cliente.nome.toLowerCase().includes(filtros.nome.toLowerCase()) : true;
            const emailMatch = filtros.email ?
                cliente.email.toLowerCase().includes(filtros.email.toLowerCase()) : true;

            return nomeMatch && emailMatch;
        });

        setClientesFiltrados(filtrados);
        setFirst(0);
    };

    const handleLimparFiltros = () => {
        setClientesFiltrados(clientes);
        setFirst(0);
    };

    if (loading) {
        return <LazyLoading/>
    }

    return(
        <main role="main" aria-label="Página principal dos clientes">

            <CabecalhoClientes
                titulo={"Clientes"}
                icone={"pi pi-users"}
                descricao={"Gerencie seus clientes e acompanhe o histórico de pedidos"}
                clicked={handleNovoCliente}
            />

            <FiltrosClientes
                onFiltrar={handleFiltrar}
                onLimpar={handleLimparFiltros}
            />

            <section role="region" aria-labelledby="Listagem de clientes">
                <span className="block font-semibold mb-4">
                    Resultados: {clientesFiltrados.length} cliente(s) encontrado(s).
                </span>
                <ClientesCard
                    displayDialog={displayDialog}
                    setDisplayDialog={setDisplayDialog}
                    isNovoCliente={isNovoCliente}
                    setIsNovoCliente={setIsNovoCliente}
                    clientes={getClientesAtuais()}
                    onClientesChange={loadClientes}
                />
            </section>

            <footer role="contentinfo" aria-label="Paginação">
                <Paginator
                    aria-label="Controles de paginação"
                    first={first}
                    rows={rows}
                    totalRecords={clientes.length}
                    rowsPerPageOptions={[6, 10, 20]}
                    onPageChange={onPageChange}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    className="border-round-xl"
                />
            </footer>

        </main>
    );
};