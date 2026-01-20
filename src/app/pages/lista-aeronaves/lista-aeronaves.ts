import { Component, OnInit } from '@angular/core';
import { Aeronave, Marca } from '../../models/aeronave.model';
import { AeronaveService } from '../../services/aeronave.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelect, MatOption } from '@angular/material/select';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-aeronaves',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatSelectModule,
    MatOption,
    MatCheckboxModule
],
  templateUrl: './lista-aeronaves.html',
  styleUrl: './lista-aeronaves.css',
})
export class ListaAeronaves implements OnInit {
  carregando = false;
  colunas: string[] = ['id', 'marca', 'nome', 'ano', 'vendido'];
  aeronaves: Aeronave[] = [];

  novaAeronave: Aeronave = {
    nome: '',
    marca: Marca.Embraer,
    ano: new Date().getFullYear(),
    descricao: '',
    vendido: false
  };

   marcas = Object.values(Marca);

  constructor(
    private api:AeronaveService,
    private router:Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(): void {
  this.carregando = true;

  this.api.listar()
    .pipe(finalize(() => {
      this.carregando = false; // garante que sempre volte a false
      this.cdr.detectChanges(); // força o Angular a renderizar
    }))
    .subscribe({
      next: (lista) => {
        this.aeronaves = lista ?? [];
      },
      error: (err) => {
        console.error('Erro ao carregar aeronaves:', err);
        this.snackBar.open('Erro ao carregar aeronaves', 'Fechar', { duration: 3000 });
      },
    });
}

  salvar(): void {
    if (!this.novaAeronave.nome || !this.novaAeronave.marca) {
      this.snackBar.open('Preencha os campos obrigatórios!', 'Fechar', { duration: 3000 });
      return;
    }

    this.api.salvarAeronave(this.novaAeronave).subscribe({
      next: () => {
        this.snackBar.open('Aeronave salva com sucesso!', 'Fechar', { duration: 3000 });
        // reseta o formulário
        this.novaAeronave = {
          nome: '',
          marca: Marca.Embraer,
          ano: new Date().getFullYear(),
          descricao: '',
          vendido: false
        };
        this.carregarLista();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao salvar aeronave:', err);
        this.snackBar.open('Erro ao salvar aeronave', 'Fechar', { duration: 3000 });
      }
    });
  }
}
