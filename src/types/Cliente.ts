import {Endereco} from "@/types/Endereco";

export interface Cliente {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: Endereco;
}