// app/produtos/[id]/page.tsx
import { notFound } from 'next/navigation';
import {Button} from 'primereact/button';

interface Props {
    params: { id: string };
}

export default async function ProdutosDaLoja({ params }: Props) {
    const lojaId = params.id;

    const res = await fetch(`http://localhost:3001/products?storeId=${lojaId}`);
    const produtos = await res.json();

    if (!produtos) return notFound();

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
}
