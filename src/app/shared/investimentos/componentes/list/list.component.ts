import { Component, OnInit } from '@angular/core';
import { Investimentos } from '../../model/investimentos';
import { ListaInvestimentosService } from '../../services/lista-investimentos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public investimentos!:Array<Investimentos>;   
  constructor(private listaInvestimentosService: ListaInvestimentosService) { }

  ngOnInit(): void {
    this.listaInvestimentosService.list().subscribe(
      (res) => (this.investimentos = res)); 
    
  }

}
