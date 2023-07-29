import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

import { ListaInvestimentosService } from './lista-investimentos.service';
import { HttpClient } from '@angular/common/http';
import { Investimentos } from '../model/investimentos';
import { MOCK_LIST } from './list-investments.mock';

describe('ListaInvestimentosService', () => {
  let service: ListaInvestimentosService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const URL = 'https://raw.githubusercontent.com/troquatte/fake-server/main/investiments-all.json';

  const mockList: Array<Investimentos> = MOCK_LIST;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ListaInvestimentosService);
  });

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) deve carregar a lista de investimentos', (done) => {
    service.list().subscribe(
      (res: Array<Investimentos>) => {
        expect(res[0].name).toEqual('Banco 1');
        expect(res[0].value).toEqual(100);

        expect(res[4].name).toEqual('Banco 5');
        expect(res[4].value).toEqual(100);

        done();
      });

      const req = httpTestingController.expectOne(URL);
      req.flush(mockList);

      expect(req.request.method).toEqual('GET');
  });

});
