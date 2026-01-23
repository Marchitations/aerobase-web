// src/app/components/historico-aeronave.dialog.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-historico-aeronave-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Histórico de Alterações</h2>

    <mat-dialog-content class="conteudo-historico">
  @if (data.historico.length > 0) {
    <table mat-table [dataSource]="data.historico" class="tabela-historico">
      <ng-container matColumnDef="campo">
        <th mat-header-cell *matHeaderCellDef>Campo</th>
        <td mat-cell *matCellDef="let item">{{ item.campo }}</td>
      </ng-container>

      <ng-container matColumnDef="valorAntigo">
        <th mat-header-cell *matHeaderCellDef>Valor antigo</th>
        <td mat-cell *matCellDef="let item">{{ item.valorAnterior }}</td>
      </ng-container>

      <ng-container matColumnDef="valorNovo">
        <th mat-header-cell *matHeaderCellDef>Valor novo</th>
        <td mat-cell *matCellDef="let item">{{ item.valorNovo }}</td>
      </ng-container>

      <ng-container matColumnDef="data">
        <th mat-header-cell *matHeaderCellDef>Data de modificação</th>
        <td mat-cell *matCellDef="let item">
          {{ item.dataAlteracao | date: 'dd/MM/yyyy HH:mm' }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="colunas"></tr>
      <tr mat-row *matRowDef="let row; columns: colunas"></tr>
    </table>
  } @else {
    <div class="sem-historico">
      <mat-icon>history_toggle_off</mat-icon>
      <p>Nenhuma modificação registrada.</p>
    </div>
  }
</mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-flat-button color="primary" (click)="dialogRef.close()">Fechar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .conteudo-historico {
      max-height: 400px;
      overflow-y: auto;
      padding: 8px 0;
    }
    .tabela-historico {
      width: 100%;
      border-collapse: collapse;
    }
    .tabela-historico th {
      background-color: #1976d2;
      color: white;
      padding: 8px;
      text-align: left;
    }
    .tabela-historico td {
      padding: 6px 8px;
      border-bottom: 1px solid #e0e0e0;
    }
    .sem-historico {
      text-align: center;
      color: #666;
      margin-top: 16px;
    }
    .sem-historico mat-icon {
      font-size: 36px;
      display: block;
      margin: 0 auto 8px;
      color: #999;
    }
  `]
})
export class HistoricoAeronaveDialog {
  colunas: string[] = ['campo', 'valorAntigo', 'valorNovo', 'data'];

  constructor(
  public dialogRef: MatDialogRef<HistoricoAeronaveDialog>,
  @Inject(MAT_DIALOG_DATA) public data: { historico: any[] } = { historico: [] }
) {}

}
