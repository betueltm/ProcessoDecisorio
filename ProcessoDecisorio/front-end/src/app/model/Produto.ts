import { Pedido } from "./pedido";

export class Produto {
  produtoid: number;
  nome: string;
  valor: number;
  categoria: string;

  PedidoProtudo: Pedido[];
}
