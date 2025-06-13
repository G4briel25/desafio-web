'use client';

import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function MenuSiderBar() {
    const router = useRouter();

    const irParaClientes = () => {
        setVisible(false);
        router.push('/clientes');
    };

    const irParaLojas = () => {
        setVisible(false);
        router.push('/');
    };

    const [visible, setVisible] = useState<boolean>(false);


    return(
        <div className="p-4 absolute right-4 card flex justify-center">
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                className="bg-white p-4"
                position="right"
            >
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-50" onClick={irParaLojas}>
                        <i className="pi pi-shop mr-4" style={{fontSize: '26px'}}></i>
                        <p className="text-xl">Lojas</p>
                    </div>
                    <div className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-50" onClick={irParaClientes}>
                        <i className="pi pi-users mr-4" style={{fontSize: '26px'}}></i>
                        <p className="text-xl">Clientes</p>
                    </div>
                </div>

            </Sidebar>
            <Button icon="pi pi-bars" className="bg-white border rounded py-1 px-3 text-xl"
                    onClick={() => setVisible(true)}/>
        </div>
    );
};