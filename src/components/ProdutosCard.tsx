import formatarMoeda from "@/utils/formatarMoeda";
import React from "react";
import {ProdutoService} from "@/services/produtosService";

interface ProdutoCardProps {
    produto: ProdutoService;
}

const ProdutosCard: React.FC<ProdutoCardProps> = ({produto}) => {
    return (
        <div
            key={produto.id}
            className="m-auto md:m-0 w-72 md:w-80 xl:w-full relative rounded overflow-hidden shadow-lg bg-white"
        >
            <span
                className={`absolute top-2 right-2 bg-gray-300 text-black text-xs font-bold px-2 py-1 rounded-md z-10`}
            >
                {produto.disponibilidade}
            </span>
            <img className="w-full h-56 object-cover"
                 src={produto.imagem}
                 alt={`Imagem de ${produto.nome}`}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">{produto.nome}</div>
                <div>
                    <strong>Preço: </strong>
                    <span className="text-blue-700 font-semibold">{formatarMoeda(produto.preco)}</span>
                </div>
                <div>
                    <strong>Categoria: </strong>{produto.categoria}
                </div>
            </div>
        </div>
    )
};

export default ProdutosCard;