import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import React, {useEffect, useState} from "react";
import lojaService from "@/services/lojaService";

interface FiltrosLojasProps {
    onFiltrar: (filtros: {
        nome: string,
        cidade: string | null,
        status: string | null,
    }) => void;
    onLimpar: () => void;
}

interface Cidade {
    name: string;
    code: string;
}

interface Status {
    status: string;
}

export default function FiltrosLojas({onFiltrar, onLimpar}: FiltrosLojasProps) {

    const [nomeLoja, setNomeLoja] = useState<string>('');

    const [cidades, setCidades] = useState<{name: string, code: string}[]>([]); //Tipo para cidades
    const [statusOpcoes, setStatusOpcoes] = useState<{status: string}[]>([]); //Tipo para status

    const [cidadeSelecionada, setCidadeSelecionada] = useState<Cidade | null>(null);
    const [statusSelecionado, setStatusSelecionado] = useState<Status | null>(null);

    // Função para exibir somente quando houver algum filtro
    const filtrosAtivos = (): boolean => {
      return !!(
          nomeLoja.trim() ||
          cidadeSelecionada ||
          statusSelecionado
      );
    };

    const handleFiltrar = () => {
        onFiltrar({
            nome: nomeLoja,
            cidade: cidadeSelecionada?.code ?? null,
            status: statusSelecionado?.status ?? null
        });
    };

    const handleLimpar = () => {
        setNomeLoja('');
        setCidadeSelecionada(null);
        setStatusSelecionado(null);
        onLimpar();
    };

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
                            value={cidadeSelecionada}
                            onChange={(e) => setCidadeSelecionada(e.value)}
                            options={cidades}
                            optionLabel="name"
                            placeholder="Todas as cidades" className="w-full md:w-14rem"
                        />
                    </div>

                    <div>
                        <p className="mb-2">Status</p>
                        <Dropdown
                            value={statusSelecionado}
                            onChange={(e) => setStatusSelecionado(e.value)}
                            options={statusOpcoes}
                            optionLabel="status"
                            placeholder="Todos os status" className="w-full md:w-14rem"
                            itemTemplate={(item) => <span>{item.status}</span>}
                        />
                    </div>
                </form>

                <div className="flex gap-3 justify-end">
                    { filtrosAtivos() && (
                        <Button
                            severity="secondary"
                            label="Limpar"
                            icon="pi pi-trash"
                            onClick={handleLimpar}
                        />
                    )}
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