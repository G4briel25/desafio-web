'use client';

import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';


export default function Lojas() {

    const [visible, setVisible] = useState<boolean>(false);
    const [nomeLoja, setNomeLoja] = useState<string>('');
    const [selecionarCidade, setSelecionarCidade] = useState(null);
    const cidades = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const [selecionarStatus, setSelecionarStatus] = useState(null);
    const status = [
        { status: 'Ativa' },
        { status: 'Inativa' }
    ];


    // Paginar
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event: { first: React.SetStateAction<number>; rows: React.SetStateAction<number>; }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className="p-4">
            <div className="absolute right-4 card flex justify-center">
                <Sidebar
                    visible={visible}
                    onHide={() => setVisible(false)}
                    className="bg-white p-4"
                >
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center">
                            <i className="pi pi-shop mr-4 text-3xl"></i>
                            <p className="text-xl">Lojas</p>
                        </div>
                        <div className="flex items-center">
                            <i className="pi pi-users mr-4 text-3xl"></i>
                            <p className="text-xl">Clientes</p>
                        </div>
                    </div>

                </Sidebar>
                <Button icon="pi pi-bars" className="bg-white border rounded py-1 px-3 text-xl" onClick={() => setVisible(true)} />
            </div>


            <main className="container mx-auto">

                {/*HEADER*/}
                <header className="mb-8">
                    <div className="flex items-center">
                        <p className="text-3xl font-bold text-gray-900">Lojas</p>
                    </div>
                    <p className="mt-2">Gerencie suas lojas e acesse produtos de cada unidade</p>
                </header>


                {/*FILTROS*/}
                <section className="mb-8">
                    <Panel header="Filtros" className="mb-5">
                        <form className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <p className="mb-2">Nome da loja</p>
                                <InputText
                                    type="text"
                                    className="w-full"
                                    placeholder="Buscar por nome"
                                    value={nomeLoja}
                                    onChange={(e) => setNomeLoja(e.target.value)}
                                />
                            </div>

                            <div>
                                <p className="mb-2">Cidade</p>
                                <Dropdown value={selecionarCidade} onChange={(e) => setSelecionarCidade(e.value)} options={cidades} optionLabel="name"
                                          placeholder="Todas as cidades" className="w-full md:w-14rem"
                                />
                            </div>

                            <div>
                                <p className="mb-2">Status</p>
                                <Dropdown value={selecionarStatus} onChange={(e) => setSelecionarStatus(e.value)} options={status} optionLabel="status"
                                          placeholder="Todas os status" className="w-full md:w-14rem"
                                />
                            </div>
                        </form>

                        <div className="flex gap-3 justify-end">
                            <Button severity="secondary" label="Limpar" icon="pi pi-trash"/>
                            <Button label="Filtrar" icon="pi pi-search"/>
                        </div>
                    </Panel>
                </section>

                {/*RESULTADO*/}
                <section>
                    <span className="block mb-4">Mostrando 3 de 3 loja(s)</span>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="relative rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                            <img className="w-full h-60 object-cover"
                                 src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400"
                                 alt="Imagem do Local"/>
                            <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md z-10">ATIVA</span>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-gray-800">Nome da Empresa/Local 3</div>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Cidade:</span> Boa Vista, Roraima
                                </p>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Telefone:</span> (95) 99999-9999
                                </p>
                                <p className="text-gray-700 text-base">
                                    <span className="font-semibold">E-mail:</span> contato@exemplo.com
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#local</span>
                                <span
                                    className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">#serviços</span>
                                <span
                                    className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mb-2">#contato</span>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div
                            className="relative rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                            <img className="w-full h-60 object-cover"
                                 src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400"
                                 alt="Imagem do Local"/>
                            <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md z-10">ATIVA</span>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-gray-800">Nome da Empresa/Local 3</div>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Cidade:</span> Boa Vista, Roraima
                                </p>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Telefone:</span> (95) 99999-9999
                                </p>
                                <p className="text-gray-700 text-base">
                                    <span className="font-semibold">E-mail:</span> contato@exemplo.com
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#local</span>
                                <span
                                    className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">#serviços</span>
                                <span
                                    className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mb-2">#contato</span>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div
                            className="relative rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                            <img className="w-full h-60 object-cover"
                                 src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400"
                                 alt="Imagem do Local"/>
                            <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md z-10">ATIVA</span>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-gray-800">Nome da Empresa/Local 3</div>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Cidade:</span> Boa Vista, Roraima
                                </p>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Telefone:</span> (95) 99999-9999
                                </p>
                                <p className="text-gray-700 text-base">
                                    <span className="font-semibold">E-mail:</span> contato@exemplo.com
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#local</span>
                                <span
                                    className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">#serviços</span>
                                <span
                                    className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mb-2">#contato</span>
                            </div>
                        </div>

                        <div
                            className="relative rounded overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                            <img className="w-full h-60 object-cover"
                                 src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400"
                                 alt="Imagem do Local"/>
                            <span className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md z-10">ATIVA</span>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-gray-800">Nome da Empresa/Local 3</div>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Cidade:</span> Boa Vista, Roraima
                                </p>
                                <p className="text-gray-700 text-base mb-1">
                                    <span className="font-semibold">Telefone:</span> (95) 99999-9999
                                </p>
                                <p className="text-gray-700 text-base">
                                    <span className="font-semibold">E-mail:</span> contato@exemplo.com
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span
                                    className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#local</span>
                                <span
                                    className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">#serviços</span>
                                <span
                                    className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mb-2">#contato</span>
                            </div>
                        </div>
                    </div>
                </section>
                <br/>
                <footer>
                    <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
                </footer>

            </main>
        </div>
    );
}