import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { Investimentos } from '../../model/investimentos';
import { MOCK_LIST } from '../../services/list-investments.mock';
import { ListaInvestimentosService } from '../../services/lista-investimentos.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const mockList: Array<Investimentos> = MOCK_LIST;
  let service: ListaInvestimentosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ListaInvestimentosService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) deve validar lista de investimentos', () => {
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.list).toHaveBeenCalledWith();
    expect(component.investimentos.length).toEqual(5);

    expect(component.investimentos[0].name).toEqual('Banco 1');
    expect(component.investimentos[0].value).toEqual(100);

    expect(component.investimentos[4].name).toEqual('Banco 5');
    expect(component.investimentos[4].value).toEqual(100);
  });

  it('(I) deve validar lista de investimentos', () => {
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    let investimentos = fixture.debugElement.nativeElement.querySelectorAll('.list-itens');

    expect(investimentos.length).toEqual(5);
    expect(investimentos[0].textContent.trim()).toEqual('Banco 1 | 100');
    expect(investimentos[4].textContent.trim()).toEqual('Banco 5 | 100');
  });
});
