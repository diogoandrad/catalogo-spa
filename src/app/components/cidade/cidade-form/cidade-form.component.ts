import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CidadeService } from 'src/app/services/cidade.service';
import { Cidade } from 'src/app/models/cidade.model';
import Swal from 'sweetalert2';

export interface DialogData {
  id?: number;
}

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.scss']
})
export class CidadeFormComponent implements OnInit {

  formGroup: FormGroup;

  cidade: Cidade;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CidadeFormComponent>,
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();

    if(this.data.id) {
      this.cidadeService.getById(this.data.id).subscribe(response => {
        this.cidade = response;
        this.updateFormGroup();
      });
    }
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      uf: new FormControl('', [Validators.required, Validators.maxLength(2)])
    });
  }

  updateFormGroup() {
    this.formGroup.patchValue({
      nome: this.cidade.nome,
      uf: this.cidade.uf
    });
  }

  onSubmit() {
    const entity = this.formGroup.value;
    const entityId = this.data.id;
    if (!entityId) {
      this.cidadeService.create(entity).subscribe({
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
      this.cidadeService.update(entityId, entity).subscribe({
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

}
