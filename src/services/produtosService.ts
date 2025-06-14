import axios from 'axios';

export interface ProdutoService {
    id: number;
    nome: string;
    preco: number;
    disponibilidade: 'Ativo' | 'Sem Estoque';
    categoria: string;
    imagem: string;
    lojaId: number;
}

const produtosService = {

    getProdutos: async (lojaId: number): Promise<ProdutoService[]> => {
        try {
            const API_PRODUTOS_URL = `http://localhost:3001/produtos?lojaId=${lojaId}`;
            const response = await axios.get<ProdutoService[]>(API_PRODUTOS_URL);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw new Error('Não foi possível carregar os produtos. Por favor, tente novamente mais tarde.');
        }
    },

    getCategoriasUnicas: async (lojaId: number): Promise<string[]> => {
        try {
            const produtos = await produtosService.getProdutos(lojaId);
            const categorias = [...new Set(produtos.map(produto => produto.categoria))];
            return Array.from(categorias).sort();
        } catch (error) {
            console.error('Erro ao buscar categorias únicas:', error);
            throw new Error('Não foi possível carregar as categorias para filtro.');
        }
    }
}

export default produtosService;