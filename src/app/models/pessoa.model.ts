import { Cidade } from 'src/app/models/cidade.model';

export class Pessoa {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  cidade: Cidade;

  constructor(object?: any) {
    this.id = object.id;
    this.nome = object.nome;
    this.cpf = object.cpf;
    this.idade = object.idade;
    this.cidade = object.cidade;
  }
}
