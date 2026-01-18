import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAeronaves } from './lista-aeronaves';

describe('ListaAeronaves', () => {
  let component: ListaAeronaves;
  let fixture: ComponentFixture<ListaAeronaves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAeronaves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAeronaves);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
