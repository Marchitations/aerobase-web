import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Aeronave } from "../models/aeronave.model";

@Injectable({providedIn:"root"})
export class AeronaveService{
    private readonly urlBase = `${environment.apiBaseUrl}/aeronaves`;

    constructor(private http:HttpClient){}

    listar(): Observable<Aeronave[]> {
        return this.http.get<Aeronave[]>(this.urlBase);
    }

    buscarPorId(id:number): Observable<Aeronave> {
        return this.http.get<Aeronave>(`${this.urlBase}/${id}`);
    }

    salvarAeronave(aeronave: Aeronave): Observable<Aeronave> {
        return this.http.post<Aeronave>(this.urlBase, aeronave);
    }

     atualizar(aeronave: Aeronave): Observable<Aeronave> {
        return this.http.put<Aeronave>(`${this.urlBase}/${aeronave.id}`, aeronave);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.urlBase}/${id}`);
    }

    buscarPorTermo(termo: string): Observable<Aeronave[]> {
        termo = termo.trim();

        if (!termo) {
            return this.listar();
        }

        return this.http.get<Aeronave[]>(`${this.urlBase}/find`, {
            params: { term: termo },
        });
    }

}