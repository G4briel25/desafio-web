export async function getProdutos() {
    const res = await fetch('http://localhost:3001/produtos', {
        cache: "no-store",
    });

    if(!res.ok) {
        throw new Error('Erro ao buscar produtos');
    }

    return res.json();
}