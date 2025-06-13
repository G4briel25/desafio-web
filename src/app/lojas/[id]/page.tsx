import {notFound} from 'next/navigation';
import {Button} from 'primereact/button';

interface Props {
    params: Promise<{ id: string }> | { id: string };
}

interface Produto {
    id: number;
    nome: string;
    preco: number;
    disponibilidade: string;
    categoria: string;
    lojaId: number;
}

export default async function ProdutosDaLoja({ params }: Props) {

    const resolvingParams = await params;
    const lojaId = resolvingParams.id;

    try {
        const res = await fetch(`http://localhost:3001/produtos?lojaId=${lojaId}`, {
            cache: 'no-store',
        });

        if(!res.ok) {
            throw new Error(`Erro ao buscar produtos da loja! status: ${res.status}`);
        }

        const produtos: Produto[] = await res.json();

        if(!produtos || produtos.length === 0) {
            return (
                <main className="p-4">
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <h1 className="text-2xl font-bold mb-4">
                            Nenhum produto encontrado para a loja {lojaId}
                        </h1>
                        <Button
                            label="Voltar para lojas"
                            icon="pi pi-arrow-left"
                            className="p-button-secondary"
                        />
                    </div>
                </main>
            );
        }

        return (
            <main className="p-4">
                <Button
                    label="Meu Botão Tailwind"
                    icon="pi pi-shop"
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                />
                <h1 className="text-2xl font-bold mb-4">Produtos da Loja {lojaId}</h1>
                <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {produtos.map((produto: any) => (
                        <li key={produto.id} className="border p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">{produto.nome}</h2>
                            <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                            <p>Disponibilidade: {produto.disponibilidade}</p>
                            <p>Categoria: {produto.categoria}</p>
                        </li>
                    ))}
                </ul>
            </main>
        );

    } catch (error) {
        console.error('Erro ao buscar produtos da loja:', error);
        return notFound();
    }

}
