'use client';

import Cabecalho from "@/components/Cabecalho";
import React, {useEffect, useState} from "react";
import FiltrosProdutos from "@/components/FiltrosProdutos";
import produtosService, {ProdutoService} from "@/services/produtosService";
import LazyLoading from "@/components/LazyLoading";
import ProdutosCard from "@/components/ProdutosCard";
import {Paginator} from "primereact/paginator";
import {useParams} from "next/navigation";
import {Button} from "primereact/button";
import {useRouter} from "next/navigation";

export default function ProdutosDaLoja() {

    const router = useRouter();

    const params = useParams();
    const lojaId = Number(params.id);

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState<ProdutoService[]>([]);
    const [produtosFiltrados, setprodutosFiltrados] = useState<ProdutoService[]>([]);

    const getProdutosAtuais = () => {
        return produtosFiltrados.slice(first, first + rows);
    };

    const onPageChange = (event: { first: React.SetStateAction<number>; rows: React.SetStateAction<number>; }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    useEffect(() => {
        const fecthProdutos = async () => {
            try {
                setLoading(true);
                const data = await produtosService.getProdutos(lojaId);
                setProdutos(data);
                setprodutosFiltrados(data);
            } catch (error) {
                console.error('Erro ao buscar produtos da loja:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 900);
            }
        }

        fecthProdutos();
    }, [lojaId]);

    const handleFiltrar = (filtros: {
       nome: string,
       categoria: string | null,
    })=> {
        const produtosFiltrados = produtos.filter(produto => {
            const matchNome = filtros.nome
                ? produto.nome.toLowerCase().includes(filtros.nome.toLowerCase())
                : true;

            const matchCategoria = filtros.categoria
                ? produto.categoria === filtros.categoria
                :true;

            return matchNome && matchCategoria;
        });

        setprodutosFiltrados(produtosFiltrados);
        setFirst(0);
    }

    const handleLimpar = () => {
        setprodutosFiltrados(produtos);
        setFirst(0);
    };

    if (loading) {
        return <LazyLoading/>
    }

    const produtosAtuais = getProdutosAtuais();

    return (
        <main role="main" aria-label="Página principal dos produtos">

            <div
                className="w-40 mb-4 flex justify-center items-center cursor-pointer py-2 px-1 border border-gray-300 rounded bg-white hover:bg-gray-100"
                onClick={() => router.push('/')}
            >
                <i className="pi pi-arrow-left mx-2"></i>
                Voltar para lojas
            </div>

            <Cabecalho
                titulo={"Produtos"}
                icone={"pi pi-box"}
                descricao={`${produtos.length} produto(s) cadastrado(s)`}
            />

            <FiltrosProdutos
                lojaId={lojaId}
                onFiltrar={handleFiltrar}
                onLimpar={handleLimpar}
            />

            <section role="region" aria-labelledby="Listagem de produtos">
                <span className="block font-semibold mb-4">
                  Resultados: {produtosFiltrados.length} produto(s) encontrado(s).
                </span>
                <div className="mb-8 grid grid-cols-1 gap-x-20 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                    {produtosAtuais.length === 0 ? (
                        <p className="text-center text-gray-600 text-lg">Nenhum produto encontrado.</p>
                    ) : (
                        produtosAtuais.map((produto: ProdutoService) => (
                            <ProdutosCard key={produto.id} produto={produto}/>
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
                    totalRecords={produtosFiltrados.length}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageChange={onPageChange}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    className="border-round-xl"
                />
            </footer>
        </main>
    );

}
