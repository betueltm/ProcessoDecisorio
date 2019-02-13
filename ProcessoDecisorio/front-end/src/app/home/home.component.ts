import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Pedido } from '../model/pedido';
import { PedidoService } from '../servicos/pedido.service';
import { HomeData } from '../model/homedata';
import { toArray } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { PedidoprodutoService } from '../servicos/pedidoproduto.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chart: any;
  pedidosSource: HomeData = new HomeData();
  pedidosSource2: HomeData = new HomeData();
  pedidosSource3: HomeData = new HomeData();
  pedidosSource4: HomeData = new HomeData();
  pedidosSource5: HomeData = new HomeData();
  pedidosSource6: HomeData = new HomeData();
  pedidosSource7: HomeData = new HomeData();
  pedidosSource8: HomeData = new HomeData();
  pedidosSource9: HomeData = new HomeData();
  pedidosSource10: HomeData = new HomeData();
  pedidosSource11: HomeData = new HomeData();
  produtosSource: HomeData = new HomeData();
  produtosSource2: HomeData = new HomeData();

  constructor(private pedidoService: PedidoService,
              private pedidoProdutoService: PedidoprodutoService) { }

  ngOnInit() {
    this.buscarPedidos();
    this.buscarPedidoProdutos();
  }

  buscarPedidoProdutos(){
    this.pedidoProdutoService.listar()
      .subscribe(listap => {
        this.produtosSource.produtos_pedidos = listap;
        this.produtosSource2.produtos_pedidos = listap;
        this.graficoDonut(this.produtosSource.vendasCategoria('',1),'donutChart',"Total de vendas por categoria, 2017 a 2018");
        this.graficoPie(this.produtosSource2.vendasProduto('',1),'pieChart',"Vendas por produto, 2017 a 2018");
      });
  }

  buscarPedidos() {
    this.pedidoService.listar()
      .subscribe(lista => {
        this.pedidosSource.pedidos = lista;
        this.pedidosSource2.pedidos = lista;
        this.pedidosSource3.pedidos = lista;
        this.pedidosSource4.pedidos = lista;
        this.pedidosSource5.pedidos = lista;
        this.pedidosSource6.pedidos = lista;
        this.pedidosSource7.pedidos = lista;
        this.pedidosSource8.pedidos = lista;
        this.pedidosSource9.pedidos = lista;
        this.pedidosSource10.pedidos = lista;
        this.pedidosSource11.pedidos = lista;
        this.graficoBarra(
          this.pedidosSource.vendasCidade('2017', 1),
          this.pedidosSource2.vendasCidade('2018', 1),
          this.pedidosSource3.vendasCidade('2018', 1.01), 'barChart');
        this.graficoBarraS(
            this.pedidosSource10.vendasCliente('', 1), 'barChart2',"Total de vendas por cliente no periodo de 2017 a 2018");
        this.graficoBarraS(
              this.pedidosSource11.vendasEstado('', 1), 'barChart3',"Total de vendas por estado, 2017 e 2018");
        this.graficoLinhaS(
            this.pedidosSource4.vendasPeriodo('', 1), 'lineChart',"Vendas no periodo de 2017 a 2018");
        this.graficoLinha(
          this.pedidosSource7.mesAmes('2017', 1),
          this.pedidosSource8.mesAmes('2018', 1),
          this.pedidosSource9.mesAmes('2018', 1.01), 'lineChart2',"Vendas mes a mês");
      });
  }

  graficoDonut(valores: Map<any,any>,id_canvas: string,titulo: string) {
    this.chart = new Chart(id_canvas, {
      type: 'doughnut',
      data: {
        labels: Array.from(valores.keys()), // your labels array
        datasets: [
          {
            
            data: Array.from(valores.values()), // your data array
            "backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)","#DD4132"],
            fill: true
          }
        ]
      },
      options: {
        title:{
          display: true,
          text: titulo,
        },
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }

  graficoPie(valores: Map<any,any>,id_canvas: string,titulo: string) {
    this.chart = new Chart(id_canvas, {
      type: 'pie',
      data: {
        labels: Array.from(valores.keys()), // your labels array
        datasets: [
          {
            label: "",
            data: Array.from(valores.values()), // your data array
            "backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)","#DD4132","#6B5B95","#FE840E","#F0EAD6"],
            fill: true
          }
        ]
      },
      options: {
        title:{
          display: true,
          text: titulo,
        },
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }

  graficoBarra(valores: Map<any,any>,valores2: Map<any,any>,valores3: Map<any,any>,id_canvas: string) {
    this.chart = new Chart(id_canvas, {
      type: 'bar',
      data: {
        labels: Array.from(valores.keys()), // your labels array
        datasets: [
          {
            label: "2017",
            data: Array.from(valores.values()), // your data array
            "backgroundColor":["rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)"],
            borderwidth: 0,
            fill: false
          },
          {
            label: "2018",
            data: Array.from(valores2.values()), // your data array
            "backgroundColor":["rgb(255, 205, 86)","rgb(255, 205, 86)","rgb(255, 205, 86)","rgb(255, 205, 86)","rgb(255, 205, 86)","rgb(255, 205, 86)","rgb(255, 205, 86)"],
            
            fill: false,
            borderwidth: 0
          },
          {
            label: "Estimativa Crescimento",
            data: Array.from(valores3.values()), // your data array
            "backgroundColor":["rgb(54, 162, 235)","rgb(54, 162, 235)","rgb(54, 162, 235)","rgb(54, 162, 235)","rgb(54, 162, 235)","rgb(54, 162, 235)","rgb(54, 162, 235)"],
             
            fill: false,
            borderwidth: 0
          }
        ]
      },
      options: {
        title:{
          display: true,
          text: "Vendas por Cidade",
        },
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: true, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }

  graficoBarraS(valores: Map<any,any>,id_canvas: string, titulo: string) {
    this.chart = new Chart(id_canvas, {
      type: 'bar',
      data: {
        labels: Array.from(valores.keys()), // your labels array
        datasets: [
          {
            label: "",
            data: Array.from(valores.values()), // your data array
            "backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)","#DD4132","#6B5B95","#FE840E","#F0EAD6"],
            borderwidth: 0,
            fill: false
          }
        ]
      },
      options: {
        title:{
          display: true,
          text: titulo,
        },
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }

  graficoLinha(valores: Map<any,any>,valores2: Map<any,any>,valores3: Map<any,any>,id_canvas: string,titulo: string) {
    this.chart = new Chart(id_canvas, {
      type: 'line',
      data: {
        labels: ["Jan","Fev","Marc","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"], // your labels array
        datasets: [
          {
            label: "2017",
            data: Array.from(valores.values()), // your data array
            borderColor:["rgb(255, 99, 132)"],
            backgroundColor:["rgb(255, 99, 132)"],
            fill: false
          },
          {
            label: "2018",
            data: Array.from(valores2.values()), // your data array
            borderColor:["rgb(255, 205, 86)"],
            backgroundColor:["rgb(255, 205, 86)"],
            fill: false
          },
          {
            label: "Estimativa Crescimento",
            data: Array.from(valores3.values()), // your data array
            borderColor:["rgb(54, 162, 235)"],
            backgroundColor:["rgb(54, 162, 235)"],
            fill: false
          }
        ]
      },
      options: {
        title:{
          display: true,
          text: titulo,
        },
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }

  graficoLinhaS(valores: Map<any,any>,id_canvas: string, titulo: string) {
    this.chart = new Chart(id_canvas, {
      type: 'line',
      data: {
        labels: Array.from(valores.keys()), // your labels array
        datasets: [
          {
            label: "",
            data: Array.from(valores.values()), // your data array
            borderColor:["rgb(255, 99, 132)"],
            backgroundColor:["rgb(255, 99, 132)"],
            fill: true
          }
        ]
      },
      options: {
        title:{
          display: true,
          text: titulo,
        },
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: false,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });
  }
}
