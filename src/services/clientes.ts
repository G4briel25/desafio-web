export async function getClientes() {
    const res = await fetch('http://localhost:3001/clientes', {
        cache: "no-store",
    });

    if(!res.ok) {
        throw new Error('Erro ao buscar clientes');
    }

    return res.json();
}