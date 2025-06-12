import React from 'react';
import {Loja} from "@/services/loja-service";

interface LojaCardProps {
    loja: Loja;
}

const LojaCard: React.FC<LojaCardProps> = ({loja}) => {
    const statusBgColor = loja.status === 'Ativa' ? 'bg-green-500' : 'bg-red-500';
    const statusText = loja.status === 'Ativa' ? 'ATIVA' : 'INATIVA';

    return (
            <div className="m-auto md:m-0 w-72 md:w-80 xl:w-full relative rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <img className="w-full h-56 object-cover"
                     src={loja.imagem}
                     alt={`Imagem de ${loja.nome}`}/>
                <span
                    className={`absolute top-2 right-2 ${statusBgColor} text-white text-xs font-bold px-2 py-1 rounded-md z-10`}>
                    {statusText}
                </span>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-gray-800">{loja.nome}</div>
                    <p className="text-gray-700 text-base mb-1">
                        <span className="font-semibold">Cidade:</span> {loja.cidade}
                    </p>
                    {loja.telefone && (
                        <p className="text-gray-700 text-base mb-1">
                        <span
                            className="font-semibold">Telefone:</span> {loja.telefone}
                        </p>
                    )}
                    {loja.email && (
                        <p className="text-gray-700 text-base">
                            <span className="font-semibold">E-mail:</span> {loja.email}
                        </p>
                    )}
                </div>
            </div>
    )
}

export default LojaCard;