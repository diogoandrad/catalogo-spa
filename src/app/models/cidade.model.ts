export class Cidade {
  id: number;
  nome: string;
  uf: string;

  constructor(object?: any) {
    this.id = object.id;
    this.nome = object.nome;
    this.uf = object.uf;
  }
}
