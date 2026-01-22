import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmar-exclusao-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Confirmação de Exclusão</h2>

    <div mat-dialog-content class="dialog-content">
      <p>
        Tem certeza de que deseja excluir a aeronave
        <strong>{{ data.nome }}</strong> (ID: {{ data.id }})?
      </p>

      <p class="alerta">
        Esta ação é <strong>irreversível</strong>.  
        Para confirmar, digite <strong>EXCLUIR</strong> abaixo:
      </p>

      <mat-form-field appearance="outline" class="campo-confirmacao">
        <input
          matInput
          [(ngModel)]="textoDigitado"
          placeholder="Digite EXCLUIR para confirmar"
          maxlength="10"
        />
      </mat-form-field>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-stroked-button color="primary" (click)="cancelar()">Cancelar</button>
      <button
        mat-flat-button
        color="warn"
        [disabled]="textoDigitado !== 'EXCLUIR'"
        (click)="confirmar()"
      >
        Confirmar Exclusão
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
      }

      h2[mat-dialog-title] {
        margin: 0 0 16px;
        font-weight: 600;
      }

      .dialog-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        min-width: 300px;
        padding: 8px 4px 16px; 
      }

      p {
        margin: 0;
      }

      .alerta {
        color: #c62828;
        font-weight: 500;
      }

      .campo-confirmacao {
        width: 100%;
        margin-top: 8px;
      }

      mat-dialog-content {
        padding: 8px 16px; 
      }

      mat-dialog-actions {
        margin-top: 16px;
        padding: 8px 16px;
      }
    `,
  ],
})
export class ConfirmarExclusaoDialog {
  textoDigitado = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmarExclusaoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; nome: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
