import {Pedido} from "@/types/Pedido";

export interface Cliente {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    endereco: {
        cep: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
    pedidos?: Pedido[];

}