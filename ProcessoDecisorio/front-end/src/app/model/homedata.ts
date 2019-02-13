import { Pedido } from "./pedido";
import { map } from 'rxjs/operators';
import { Produto } from "./produto";
import { PedidoProduto } from "./pedidoproduto";
import { Local } from "protractor/built/driverProviders";

export class HomeData {
  pedidos : Pedido[];
  produtos_pedidos : PedidoProduto[];
  iterator: number;
  retorno: Map<string,number> = new Map();
  dtTmp: string;

  public vendasPeriodo(filtro: string,fator:number): Map<string,number> {
    this.iterator = 0;
    this.retorno.clear();
    while (this.iterator < this.pedidos.length) {
      if(this.pedidos[this.iterator].data.match(filtro) !== null){
        if (this.retorno.has(this.pedidos[this.iterator].data)) {
          this.retorno.set(this.pedidos[this.iterator].data, (this.pedidos[this.iterator].total + this.retorno.get(this.pedidos[this.iterator].data)) * fator);
        } else {
          this.retorno.set(this.pedidos[this.iterator].data, this.pedidos[this.iterator].total * fator);
        }
      }
      this.iterator++;
    }
    return this.retorno;
  }

  public vendasCidade(filtro: string, fator:number): Map<string,number> {
    this.iterator = 0;
    this.retorno.clear();
    this.pedidos.sort(this.ordenarPorCidade);
    while (this.iterator < this.pedidos.length) {
      if(this.pedidos[this.iterator].data.match(filtro) !== null){
        if (this.retorno.has(this.pedidos[this.iterator].cidade)) {
          this.retorno.set(this.pedidos[this.iterator].cidade, (this.pedidos[this.iterator].total + this.retorno.get(this.pedidos[this.iterator].cidade)) * fator);
        } else {
          this.retorno.set(this.pedidos[this.iterator].cidade, this.pedidos[this.iterator].total * fator);
        }
      }
      this.iterator++;
    }
    console.log(this.retorno);
    return this.retorno;
  }

  public vendasEstado(filtro: string, fator:number): Map<string,number> {
    this.iterator = 0;
    this.retorno.clear();
    
    while (this.iterator < this.pedidos.length) {
      if(this.pedidos[this.iterator].data.match(filtro) !== null){
        if (this.retorno.has(this.pedidos[this.iterator].estado)) {
          this.retorno.set(this.pedidos[this.iterator].estado, (this.pedidos[this.iterator].total + this.retorno.get(this.pedidos[this.iterator].estado)) * fator);
        } else {
          this.retorno.set(this.pedidos[this.iterator].estado, this.pedidos[this.iterator].total * fator);
        }
      }
      this.iterator++;
    }
    return this.retorno;
  }

  public vendasCliente(filtro: string, fator:number): Map<string,number> {
    this.iterator = 0;
    this.retorno.clear();
    
    while (this.iterator < this.pedidos.length) {
      if(this.pedidos[this.iterator].cliente.match(filtro) !== null){
        if (this.retorno.has(this.pedidos[this.iterator].cliente)) {
          this.retorno.set(this.pedidos[this.iterator].cliente, (this.pedidos[this.iterator].total + this.retorno.get(this.pedidos[this.iterator].cliente)) * fator);
        } else {
          this.retorno.set(this.pedidos[this.iterator].cliente, this.pedidos[this.iterator].total * fator);
        }
      }
      this.iterator++;
    }
    return this.retorno;
  }

  public vendasCategoria(filtro: string, fator:number): Map<string,number> {
    this.iterator = 0;
    this.retorno.clear();
    
    while (this.iterator < this.produtos_pedidos.length) {
      if(this.produtos_pedidos[this.iterator].produto.categoria.match(filtro) !== null){
        if(this.retorno.has(this.produtos_pedidos[this.iterator].produto.categoria)){
          this.retorno.set(this.produtos_pedidos[this.iterator].produto.categoria,
                                  (this.produtos_pedidos[this.iterator].produto.valor + this.retorno.get(this.produtos_pedidos[this.iterator].produto.categoria)*fator));
        }else{
          this.retorno.set(this.produtos_pedidos[this.iterator].produto.categoria,(this.produtos_pedidos[this.iterator].produto.valor)*fator);
        }
      }
      this.iterator++;
    }
    return this.retorno;
  }

  public vendasProduto(filtro: string, fator:number): Map<string,number> {
    this.iterator = 0;
    this.retorno.clear();
    
    while (this.iterator < this.produtos_pedidos.length) {
      if(this.produtos_pedidos[this.iterator].produto.nome.match(filtro) !== null){
        if(this.retorno.has(this.produtos_pedidos[this.iterator].produto.nome)){
          this.retorno.set(this.produtos_pedidos[this.iterator].produto.nome,
                                  (this.produtos_pedidos[this.iterator].produto.valor + this.retorno.get(this.produtos_pedidos[this.iterator].produto.nome)*fator));
        }else{
          this.retorno.set(this.produtos_pedidos[this.iterator].produto.nome,(this.produtos_pedidos[this.iterator].produto.valor)*fator);
        }
      }
      this.iterator++;
    }
    return this.retorno;
  }

  public mesAmes(filtro: string, fator:number): Map<string,number> {
    this.iterator = 0;
    this.retorno.clear();
    //this.pedidos.sort(this.ordenarPorData);
    while (this.iterator < this.pedidos.length) {
      if(this.pedidos[this.iterator].data.match(filtro) !== null){
        this.dtTmp = this.pedidos[this.iterator].data[3] + this.pedidos[this.iterator].data[4];
        if(this.retorno.has(this.dtTmp)){
          this.retorno.set(this.dtTmp, (this.pedidos[this.iterator].total + this.retorno.get(this.dtTmp))*fator);
        }else{
          this.retorno.set(this.dtTmp,(this.pedidos[this.iterator].total)*fator);
        }
      }
      this.iterator++;
    }
    return this.retorno;
  }
  
  ordenarPorCidade(a: Pedido,b: Pedido){
    if(a.cidade < b.cidade){
      return -1;
    }
    if(a.data > b.data){
      return 1;
    }
    return 0;
  }
}
