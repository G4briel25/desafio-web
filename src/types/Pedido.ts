import {Produto} from "@/types/Produto";

export interface Pedido {
    id?: number;
    data: string;
    loja: string;
    status: string;
    produtos: Produto[];
    valorTotal: number;
}