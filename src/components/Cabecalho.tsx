import React from "react";

interface CabecalhoProps {
    titulo: string;
    icone: string;
    descricao: string;
}

export default function Cabecalho({titulo, icone, descricao}: CabecalhoProps) {

    return(
        <header className="mb-8">
            <div className="flex items-center">
                <i className={`${icone} mr-4 text-indigo-600`} style={{fontSize: '32px'}}></i>
                <p className="text-4xl font-bold text-gray-900">{titulo}</p>
            </div>
            <br/>
            <p>{descricao}</p>
        </header>
    )

}