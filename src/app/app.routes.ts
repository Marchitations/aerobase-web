import { Routes } from '@angular/router';
import { ListaAeronaves } from './pages/lista-aeronaves/lista-aeronaves';

export const routes: Routes = [
    { path: '**', redirectTo: '' },
    { path: '',  component:ListaAeronaves , title:"Aeronaves" },
];


