import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Investimentos } from '../model/investimentos';

@Injectable({
  providedIn: 'root'
})
export class ListaInvestimentosService {

  private url: string = "https://raw.githubusercontent.com/troquatte/fake-server/main/investiments-all.json";
  constructor(
    private http: HttpClient
  ) { }

  public list(): Observable<Array<Investimentos>>{
    return this.http.get<Array<Investimentos>>(this.url).pipe(
      map((res) => res));
  }
}
