import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../service/product-list.service'; 
import { ChartDataSets, ChartOptions, ChartPoint, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.css']
})
export class TopProductComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: { anchor: 'end', align: 'end'}
  }

  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];
  barChartData: ChartDataSets[] = [
    {data: [], label: 'Top Viewed Products'}
  ]
  
  topN: number = 5;
  products: any[];
  productNames: string[] = [];
  productCounts: number[] = [];
  

  constructor(private productListService: ProductListService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productListService.reverseByClick().subscribe(
      (products: any) => {
        this.products = products;
        this.getTopNProducts();
      },
      error => console.log('error occured while retrieving products from server', error)
    );
  }

  getTopNProducts() {
    for(let i=0; i<this.topN; i++){
      this.barChartLabels.push(this.products[i].name);
      this.barChartData[0].data.push(this.products[i].clickCount);
    }
  }
}
