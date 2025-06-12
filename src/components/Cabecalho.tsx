import React from "react";

export default function Cabecalho() {

    return(
        <header className="mb-8">
            <div className="flex items-center">
                <i className="pi pi-shop mr-4 text-indigo-600" style={{fontSize: '32px'}}></i>
                <p className="text-4xl font-bold text-gray-900">Lojas</p>
            </div>
            <br/>
            <p className="">Gerencie suas lojas e acesse produtos de cada unidade</p>
        </header>
    )

}