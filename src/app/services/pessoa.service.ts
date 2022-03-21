import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from 'src/app/models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

    private controller = 'Pessoa';

    public apiUrl = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({
            'content-type': 'appplication/json'
        })
    };

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Pessoa[]> {
        return this.httpClient.get<Pessoa[]>(`${this.apiUrl}/${this.controller}`);
    }

    getById(id: number): Observable<Pessoa> {
        return this.httpClient.get<Pessoa>(`${this.apiUrl}/${this.controller}/${id}`);
    }

    create(pessoa: Pessoa): Observable<Pessoa> {
        return this.httpClient.post<Pessoa>(`${this.apiUrl}/${this.controller}`, pessoa);
    }

    update(id: number, pessoa: Pessoa): Observable<Pessoa> {
        return this.httpClient.put<Pessoa>(`${this.apiUrl}/${this.controller}/${id}`, pessoa);
    }

    delete(id: number): any {
        return this.httpClient.delete<any>(`${this.apiUrl}/${this.controller}/${id}`);
    }

}
