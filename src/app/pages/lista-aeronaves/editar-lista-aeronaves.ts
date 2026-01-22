import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aeronave, Marca } from '../../models/aeronave.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-aeronave-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Editar Aeronave</h2>

    <div mat-dialog-content class="form-container">
      <form #form="ngForm">
        <mat-form-field appearance="fill">
          <mat-label>Nome</mat-label>
          <input matInput [(ngModel)]="aeronave.nome" name="nome" required />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <mat-select [(ngModel)]="aeronave.marca" name="marca">
            <mat-option *ngFor="let marca of marcas" [value]="marca">
              {{ marca }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Ano</mat-label>
          <input matInput type="number" [(ngModel)]="aeronave.ano" name="ano" />
        </mat-form-field>

        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Descrição</mat-label>
          <textarea
            matInput
            rows="3"
            [(ngModel)]="aeronave.descricao"
            name="descricao"
          ></textarea>
        </mat-form-field>

        <mat-checkbox [(ngModel)]="aeronave.vendido" name="vendido">
          Vendido
        </mat-checkbox>
      </form>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-stroked-button color="warn" (click)="cancelar()">Cancelar</button>
      <button mat-flat-button color="primary" (click)="salvar()">Salvar alterações</button>
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

      .form-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        min-width: 300px;
        padding: 8px 4px 16px;
      }

      mat-dialog-content {
        padding: 8px 16px;
      }

      mat-form-field {
        width: 100%;
      }

      mat-dialog-actions {
        margin-top: 16px;
        padding: 8px 16px;
      }
    `,
  ],
})


export class EditarAeronaveDialog {
  aeronave: Aeronave;
  marcas = Object.values(Marca);

  constructor(
    public dialogRef: MatDialogRef<EditarAeronaveDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Aeronave
  ) {
    this.aeronave = { ...data };
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.aeronave);
  }
}
