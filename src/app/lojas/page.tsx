'use client';

import React, {useEffect, useState} from 'react';
import {Paginator} from 'primereact/paginator';
import lojaService, {Loja} from '@/services/loja-service';
import LojaCard from "@/components/LojaCard";
import Cabecalho from "@/components/Cabecalho";
import FiltrosLojas from "@/components/FiltrosLojas";
import LazyLoading from "@/components/LazyLoading";


export default function Lojas() {

    // Paginar
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6);

    const getLojasAtuais = () => {
        return lojasFiltradas.slice(first, first + rows);
    };

    const onPageChange = (event: { first: React.SetStateAction<number>; rows: React.SetStateAction<number>; }) => {
        setFirst(event.first);
        setRows(event.rows);
    };


    //Loading
    const [loading, setLoading] = useState(true);

    //loja-service
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [lojasFiltradas, setLojasFiltradas] = useState<Loja[]>([]);

    useEffect(() => {
        const fecthLojas = async () => {
            try {
                setLoading(true);
                const data = await lojaService.getLojas();
                setLojas(data);
                setLojasFiltradas(data);
            } catch (erro) {
                console.error('Erro ao buscar lojas:', erro);
            } finally {
                // Intervalo para ver como se comporta na hora de carregar a pagina
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        }

        fecthLojas();
    }, []);

    const handleFiltrar = (filtros: {
        nome: string,
        cidade: string | null,
        status: string | null,
    }) => {
        const lojasFiltradas = lojas.filter(loja => {
            const matchNome = filtros.nome
            ? loja.nome.toLowerCase().includes(filtros.nome.toLowerCase())
            : true;

            const matchCidade = filtros.cidade
            ? loja.cidade === filtros.cidade
            : true;

            const matchStatus = filtros.status
            ? loja.status === filtros.status
            : true;

            return matchNome && matchCidade && matchStatus;
        });

        setLojasFiltradas(lojasFiltradas);
        setFirst(0);
    };

    const handleLimpar = () => {
        setLojasFiltradas(lojas);
        setFirst(0);
    };

    if (loading) {
        return <LazyLoading/>
    }

    const lojasAtuais = getLojasAtuais();


    return (
        <main role="main" aria-label="Página principal de lojas">
            {/*HEADER*/}
            <Cabecalho/>

            {/*FILTROS*/}
            <FiltrosLojas onFiltrar={handleFiltrar} onLimpar={handleLimpar}/>

            {/*RESULTADO*/}
            <section role="region" aria-labelledby="Listagem de lojas">
                <span className="block font-semibold mb-4">
                  Resultados: {lojasFiltradas.length} lojas encontradas.
                </span>
                <div className="mb-8 grid grid-cols-1 gap-x-20 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                    {lojasAtuais.length === 0 ? (
                        <p className="text-center text-gray-600 text-lg">Nenhuma loja encontrada.</p>
                    ) : (
                        lojasAtuais.map((loja: Loja) => (
                            <LojaCard key={loja.id} loja={loja}/>
                        ))
                    )
                    }
                </div>
            </section>

            <footer role="contentinfo" aria-label="Paginação">
                <Paginator
                    aria-label="Controles de paginação"
                    first={first}
                    rows={rows}
                    totalRecords={lojasFiltradas.length}
                    rowsPerPageOptions={[6, 10, 20]}
                    onPageChange={onPageChange}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    className="border-round-xl"
                />
            </footer>
        </main>
    );
}