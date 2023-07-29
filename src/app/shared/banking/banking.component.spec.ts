import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingComponent } from './banking.component';
import { ListComponent } from '../investimentos/componentes/list/list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing'

describe('BankingComponent', () => {
  let component: BankingComponent;
  let fixture: ComponentFixture<BankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankingComponent, ListComponent ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) getPoupanca(): valor da poupanca deve ser igual a 10`, () => {
    expect(component.getPoupanca).toEqual(10);
  });

  it(`(U) getCarteira(): valor da carteira deve ser igual a 50`, () => {
    expect(component.getCarteira).toEqual(50);
  });

  it(`(U) setSacar(): deve transferir o valor da poupança para carteira`, () => {
    component.setSacar('10');

    expect(component.getPoupanca).toEqual(0);
    expect(component.getCarteira).toEqual(60);
  });

  it(`(I) setSacar(): deve transferir o valor da poupança para carteira`, () => {
    let el = fixture.debugElement.nativeElement;

    el.querySelector('#input-sacar').value = '10';
    el.querySelector('#sacar').click();
    fixture.detectChanges();
    expect(el.querySelector("#get-carteira").textContent).toEqual('60');
  });

  it(`(U) setSacar(): deve validar que string (isNaN) ou poupança não pode ser < value`, () => {

    expect(component.setSacar('string')).not.toBeTruthy();
    expect(component.setSacar('100')).not.toBeTruthy();

    expect(component.getPoupanca).toEqual(10);
    expect(component.getCarteira).toEqual(50);
  });



  it(`(U) setDepositar(): deve transferir o valor da carteira para poupanca`, () => {
    component.setDepositar('50');

    expect(component.getCarteira).toEqual(0);
    expect(component.getPoupanca).toEqual(60);

  });

  it(`(U) setDepositar(): deve transferir o valor da carteira somente quando string (isNaN) ou carteira não for < value`, () => {

    expect(component.setDepositar('string')).not.toBeTruthy();
    expect(component.setDepositar('100')).not.toBeTruthy();

    expect(component.getPoupanca).toEqual(10);
    expect(component.getCarteira).toEqual(50);
  });


  it(`(I) setDepositar(): deve transferir o valor da carteira para poupanca`, () => {
    let el = fixture.debugElement.nativeElement;

    el.querySelector('#input-depositar').value = '10';
    el.querySelector('#depositar').click();
    fixture.detectChanges();
    expect(el.querySelector("#get-poupanca").textContent).toEqual('20');

  });


});
