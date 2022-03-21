import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pessoa } from 'src/app/models/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import Swal from 'sweetalert2';
import { PessoaFormComponent } from '../pessoa-form/pessoa-form.component';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss'],
})
export class PessoaListComponent implements OnInit {

  listaPessoas = Array<Pessoa>();

  constructor(private pessoaService: PessoaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.pessoaService.getAll().subscribe({
      next: (response: Pessoa[]) => {
        this.listaPessoas = response;
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

  openDialog(id?: number | undefined) {
    const dialogRef = this.dialog.open(PessoaFormComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaService.delete(id).subscribe({
          next: () => {
            this.getAll();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Excluído!',
              text: 'Excluído com sucesso.',
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
    })
  }

}
