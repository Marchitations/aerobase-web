import { Component, OnInit } from '@angular/core';
import { Aeronave, Marca } from '../../models/aeronave.model';
import { AeronaveService } from '../../services/aeronave.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { MatRow, MatRowDef, MatTableModule } from '@angular/material/table';
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
import { MatDialog } from '@angular/material/dialog';
import { EditarAeronaveDialog } from './editar-lista-aeronaves';
import { MatDialogModule } from '@angular/material/dialog';


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
    MatCheckboxModule,
    MatRow,
    MatDialogModule,

],
  templateUrl: './lista-aeronaves.html',
  styleUrl: './lista-aeronaves.css',
})
export class ListaAeronaves implements OnInit {
  carregando = false;
  colunas: string[] = ['id', 'marca', 'nome', 'ano', 'vendido'];
  aeronaves: Aeronave[] = [];

  totalNaoVendidas = 0;
  aeronavesPorDecada: { decada: string; quantidade: number }[] = [];
  ultimaSemana = 0

  aeronaveSelecionada: Aeronave | null = null;

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
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
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
        this.calcularEstatisticas();
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

  private calcularEstatisticas(): void {
    // Total de aeronaves não vendidas
    this.totalNaoVendidas = this.aeronaves.filter((a) => !a.vendido).length;

    // Agrupamento por década
    const mapa = new Map<string, number>();
    this.aeronaves.forEach((a) => {
      const decada = Math.floor(a.ano / 10) * 10;
      const chave = `${decada}s`;
      mapa.set(chave, (mapa.get(chave) ?? 0) + 1);
    });

    // Converter em array para exibir no template
    this.aeronavesPorDecada = Array.from(mapa, ([decada, quantidade]) => ({
      decada,
      quantidade,
    })).sort((a, b) => Number(a.decada) - Number(b.decada));

     const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    this.ultimaSemana = this.aeronaves.filter((a) => {
      if (!a.criado) return false;
      const dataCriacao = new Date(a.criado);
      // compara apenas a data (ignorando hora)
      const dataSemHora = new Date(
        dataCriacao.getFullYear(),
        dataCriacao.getMonth(),
        dataCriacao.getDate()
      );
      return dataSemHora >= seteDiasAtras;
    }).length;
  }

   selecionarAeronave(aeronave: Aeronave): void {
    // se clicar novamente na mesma aeronave, "fecha" o painel
    if (this.aeronaveSelecionada?.id === aeronave.id) {
      this.aeronaveSelecionada = null;
    } else {
      this.aeronaveSelecionada = aeronave;
    }
  }

  abrirDialogEdicao(aeronave: Aeronave): void {
    const dialogRef = this.dialog.open(EditarAeronaveDialog, {
      width: '500px',
      data: aeronave,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.api.atualizar(resultado).subscribe({
          next: () => {
            this.snackBar.open('Aeronave atualizada com sucesso!', 'Fechar', { duration: 3000 });
            this.carregarLista();
          },
          error: (err) => {
            console.error('Erro ao atualizar aeronave:', err);
            this.snackBar.open('Erro ao atualizar aeronave', 'Fechar', { duration: 3000 });
          },
        });
      }
    });
  }

}
