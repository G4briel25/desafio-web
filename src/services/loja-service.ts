import axios from 'axios';

export interface Loja {
    id: number;
    nome: string;
    cidade: string;
    status: 'ativa' | 'inativa';
    imagem: string;
    telefone?: string;
    email?: string;
}

const API_BASE_URL = 'http://localhost:3001';

const lojaService = {

    getLojas: async (): Promise<Loja[]> => {
        try {
            const response = await axios.get<Loja[]>(`${API_BASE_URL}/lojas`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar lojas:', error);
            throw new Error('Não foi possível carregar as lojas. Por favor, tente novamente mais tarde.');
        }
    },

    getCidadesUnicas: async (): Promise<string[]> => {
        try {
            const lojas = await lojaService.getLojas();
            const cidades = [...new Set(lojas.map(loja => loja.cidade))];
            return Array.from(cidades).sort();
        } catch (error) {
            console.error('Erro ao buscar cidades únicas:', error);
            throw new Error('Não foi possível carregar as cidades para filtro.');
        }
    },

    getStatusUnicos: async (): Promise<Array<{status: string}>> => {
        try {
            const lojas = await lojaService.getLojas();
            const statusSet = new Set<string>();
            lojas.forEach(loja => statusSet.add(loja.status));
            return Array.from(statusSet).map(s => ({status: s === 'ativa' ? 'Ativa' : 'Inativa'}));
        } catch (error) {
            console.error('Erro ao buscar status únicos:', error);
            throw new Error('Não foi possível carregar os status para filtro.');
        }
    }
};

export default lojaService;