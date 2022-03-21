import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cidade } from 'src/app/models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

    private controller = 'Cidade';

    public apiUrl = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({
            'content-type': 'appplication/json'
        })
    };

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Cidade[]> {
        return this.httpClient.get<Cidade[]>(`${this.apiUrl}/${this.controller}`);
    }

    getById(id: number): Observable<Cidade> {
        return this.httpClient.get<Cidade>(`${this.apiUrl}/${this.controller}/${id}`);
    }

    create(cidade: Cidade): Observable<Cidade> {
        return this.httpClient.post<Cidade>(`${this.apiUrl}/${this.controller}`, cidade);
    }

    update(id: number, cidade: Cidade): Observable<Cidade> {
        return this.httpClient.put<Cidade>(`${this.apiUrl}/${this.controller}/${id}`, cidade);
    }

    delete(id: number): any {
        return this.httpClient.delete<any>(`${this.apiUrl}/${this.controller}/${id}`);
    }

}
