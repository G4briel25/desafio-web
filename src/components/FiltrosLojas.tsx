import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import React, {useEffect, useState} from "react";
import lojaService from "@/services/loja-service";

interface FiltrosLojasProps {
    onFiltrar: (filtros: {
        nome: string,
        cidade: string | null,
        status: string | null,
    }) => void;
    onLimpar: () => void;
}

export default function FiltrosLojas({onFiltrar, onLimpar}: FiltrosLojasProps) {

    const [nomeLoja, setNomeLoja] = useState<string>('');

    const [cidades, setCidades] = useState<{name: string, code: string}[]>([]); //Tipo para cidades
    const [statusOpcoes, setStatusOpcoes] = useState<{status: string}[]>([]); //Tipo para status

    const [selecionarCidade, setSelecionarCidade] = useState(null);
    const [selecionarStatus, setSelecionarStatus] = useState(null);

    useEffect(() => {
        const fetchFiltros = async () => {

            // Buscar Cidades e Status
            try {
                const [cidadesData, statusData] = await Promise.all([
                    lojaService.getCidadesUnicas(),
                    lojaService.getStatusUnicos()
                ]);

                const formatarCidades = cidadesData.map(cidade => ({
                    name: cidade,
                    code: cidade
                }));
                setCidades(formatarCidades);
                setStatusOpcoes(statusData);

            } catch (error) {
                console.error('Erro ao carregar cidades.', error);
            }
        };

        fetchFiltros();
    }, []);

    const handleFiltrar = () => {
        onFiltrar({
            nome: nomeLoja,
            cidade: selecionarCidade ? selecionarCidade.name : null,
            status: selecionarStatus ? selecionarStatus.status : null
        })
    };

    const handleLimpar = () => {
        setNomeLoja('');
        setSelecionarCidade(null);
        setSelecionarStatus(null);
        onLimpar();
    }

    return (
        <section>
            <Panel header="Filtros" className="mb-5">
                <form
                    className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleFiltrar();
                    }}
                >
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
                        <Dropdown
                            value={selecionarCidade}
                            onChange={(e) => setSelecionarCidade(e.value)}
                            options={cidades}
                            optionLabel="name"
                            placeholder="Todas as cidades" className="w-full md:w-14rem"
                        />
                    </div>

                    <div>
                        <p className="mb-2">Status</p>
                        <Dropdown
                            value={selecionarStatus}
                            onChange={(e) => setSelecionarStatus(e.value)}
                            options={statusOpcoes}
                            optionLabel="status"
                            placeholder="Todas os status" className="w-full md:w-14rem"
                        />
                    </div>
                </form>

                <div className="flex gap-3 justify-end">
                    <Button
                        severity="secondary"
                        label="Limpar"
                        icon="pi pi-trash"
                        onClick={handleLimpar}
                    />
                    <Button
                        label="Filtrar"
                        icon="pi pi-search"
                        onClick={handleFiltrar}
                    />
                </div>
            </Panel>
        </section>
    )
}