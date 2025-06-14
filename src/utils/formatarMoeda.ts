const formatarMoeda = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

export default formatarMoeda;