import React from "react";

interface CabecalhoProps {
    titulo: string;
    icone: string;
    descricao: string;
    clicked: () => void;
}

export default function CabecalhoClientes({titulo, icone, descricao, clicked}: CabecalhoProps) {

    return(
        <header className="mb-8">
            <div className="flex items-center">
                <i className={`${icone} mr-4 text-indigo-600`} style={{fontSize: '32px'}}></i>
                <p className="text-4xl font-bold text-gray-900">{titulo}</p>
            </div>
            <br/>
            <div className="flex items-center justify-between">
                <p className="w-96 text-lg md:w-full">{descricao}</p>

                <span
                    onClick={clicked}
                    className="bg-gray-800 md:w-48 text-white p-4 md:py-2 md:px-1 rounded-md flex justify-around items-center cursor-pointer hover:bg-gray-800">
                    <i className="pi pi-plus"></i>
                    <span className="ml-2 hidden md:block">Novo cliente</span>
                </span>
            </div>
        </header>
    )

}