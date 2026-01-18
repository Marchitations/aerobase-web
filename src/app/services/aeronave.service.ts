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
}