import {Panel} from "primereact/panel";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";
import produtosService from "@/services/produtosService";

interface FiltrosProdutosProps {
    lojaId: number;
    onFiltrar: (filtros: {
        nome: string,
        categoria: string | null,
    }) => void;
    onLimpar: () => void;
}

export default function FiltrosProdutos({lojaId, onFiltrar, onLimpar}: FiltrosProdutosProps) {

    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [categorias, setCategorias] = useState<{name: string, code: string}[]>([]);
    const [selecionarCategoria, setSelecionarCategora] = useState(null);

    const filtrosAtivos = (): boolean => {
        return !!(
            nomeProduto.trim() ||
            selecionarCategoria
        );
    };

    useEffect(() => {
        const fetchFiltros = async () => {
            try {
                const categoriasData = await produtosService.getCategoriasUnicas(lojaId);
                const formatarCategorias = categoriasData.map(categoria => ({
                    name: categoria,
                    code: categoria
                }));
                setCategorias(formatarCategorias);
            } catch (error) {
                console.error('Erro ao carregar cidades.', error);
            }
        }

        fetchFiltros();
    }, []);

    const handleFiltrar = () => {
        onFiltrar({
            nome: nomeProduto,
            categoria: selecionarCategoria ? selecionarCategoria.code : null,
        })
    };

    const handleLimpar = () => {
        setNomeProduto('');
        setSelecionarCategora(null);
        onLimpar();
    }

    return (
        <section>
            <Panel header="Filtros" className="mb-5">
                <form
                    className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <div>
                        <p className="mb-2">Nome do produto</p>
                        <InputText
                            type="text"
                            className="w-full"
                            placeholder="Buscar por nome"
                            value={nomeProduto}
                            onChange={(e) => setNomeProduto(e.target.value)}
                        />
                    </div>

                    <div>
                        <p className="mb-2">Categoria</p>
                        <Dropdown
                            optionLabel="name"
                            placeholder="Todas as categorias" className="w-full md:w-14rem"
                            value={selecionarCategoria}
                            onChange={(e) => setSelecionarCategora(e.value)}
                            options={categorias}
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