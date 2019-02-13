import { Produto } from "./produto";
import { Pedido } from "./pedido";

export class PedidoProduto {
  id: number;
  produtoid: number;
  produto: Produto;
  pedidoid: number;
  pedido: Pedido;
  }
