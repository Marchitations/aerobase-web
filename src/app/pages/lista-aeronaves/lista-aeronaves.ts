import { Component, OnInit } from '@angular/core';
import { Aeronave } from '../../models/aeronave.model';
import { AeronaveService } from '../../services/aeronave.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-aeronaves',
  imports: [
  MatTableModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
],
  templateUrl: './lista-aeronaves.html',
  styleUrl: './lista-aeronaves.css',
})
export class ListaAeronaves implements OnInit {
  carregando = false;
  colunas: string[] = ['id', 'marca', 'nome', 'ano', 'vendido'];
  aeronaves: Aeronave[] = [];
  constructor(
    private api:AeronaveService,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(): void {
  this.carregando = true;
  console.log('inicio:', this.carregando);

  this.api.listar()
    .subscribe({
      next: (lista) => {
        console.log('next:', this.carregando); // ainda true
        this.aeronaves = lista ?? [];
        this.carregando = false;
      },
      error: (err) => console.error('error:', err),
    });
  }
}
