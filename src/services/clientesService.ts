import axios from "axios";
import {Cliente} from "@/types/Cliente";

const API_URL = 'http://localhost:3001/clientes';

const clientesService = {

    getClientes: async (): Promise<Cliente[]> => {
        try {
            const response = await axios.get<Cliente[]>(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw new Error('Não foi possível carregar os clientes. Por favor, tente novamente mais tarde.');
        }
    },

    createCliente: async (cliente: Cliente): Promise<Cliente> => {
        try {
            const response = await axios.post<Cliente>(`${API_URL}`, cliente);
            return response.data;
        } catch (error) {
            console.error('Erro ao cadastrar um novo cliente:', error);
            throw new Error('Não foi possível cadastrar o cliente. Por favor, tente novamente mais tarde.');
        }
    },

    updateCliente: async (cliente: Cliente): Promise<Cliente> => {
        try {
            const response = await axios.put<Cliente>(`${API_URL}/${cliente.id}`, cliente);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw new Error('Não foi possível atualizar cliente. Por favor, tente novamente mais tarde.');
        }
    },

    deleteCliente: async (id: number): Promise<void> => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            throw new Error('Não foi possível deletar cliente. Por favor, tente novamente mais tarde.');
        }
    }

}

export default clientesService;