import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Observable, startWith, map } from 'rxjs';
import { Pessoa } from 'src/app/models/pessoa.model';
import Swal from 'sweetalert2';

export interface DialogData {
  id?: number;
}

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss'],
})
export class PessoaFormComponent implements OnInit {

  formGroup: FormGroup;

  pessoa: Pessoa;

  listaCidades = Array<Cidade>();
  listaCidadesFiltered: Observable<Cidade[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<PessoaFormComponent>,
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.getCidades();

    if(this.data.id) {
      this.pessoaService.getById(this.data.id).subscribe(response => {
        this.pessoa = response;
        this.updateFormGroup();
      });
    }
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      cpf: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      idade: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      cidadeId: new FormControl('', [Validators.required])
    });
  }

  updateFormGroup() {
    this.formGroup.patchValue({
      nome: this.pessoa.nome,
      cpf: this.pessoa.cpf,
      idade: this.pessoa.idade,
      cidadeId: {
        id: this.pessoa.cidade.id,
        nome: this.pessoa.cidade.nome,
        uf: this.pessoa.cidade.uf,
      }
    });
  }

  onSubmit() {
    const entity = this.formGroup.value;
    const entityId = this.data.id;
    entity.idade = Number(this.formGroup.value.idade);
    entity.cidadeId = Number(this.formGroup.value.cidadeId.id);
    if (!entityId) {
      this.pessoaService.create(entity).subscribe({
        next: () => {
          this.dialogRef.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Salvo!',
            text: 'Salvo com sucesso.',
            showConfirmButton: false,
            timer: 1500
          })
        },
          error: (error: Error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Algo deu errado! ${error.message}`
            })
          }
      });
    } else {
      this.pessoaService.update(entityId, entity).subscribe({
        next: () => {
          this.dialogRef.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Salvo!',
            text: 'Salvo com sucesso.',
            showConfirmButton: false,
            timer: 1500
          })
        },
          error: (error: Error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Algo deu errado! ${error.message}`
            })
          }
      });
    }
  }

  getCidades() {
    this.cidadeService.getAll().subscribe({
      next: (response: Cidade[]) => {
        this.listaCidades = response;
        this.searchCidade();
      }
    });
  }

  private searchCidade() {
    this.listaCidadesFiltered = this.formGroup.controls['cidadeId'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Cidade[] {
    const filterValue = value.toLowerCase();
    return this.listaCidades.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  public displayProperty(value: Cidade): string {
    return value && value.nome ? value.nome : '';
  }

}
