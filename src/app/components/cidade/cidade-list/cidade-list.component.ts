import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeService } from 'src/app/services/cidade.service';
import Swal from 'sweetalert2';
import { CidadeFormComponent } from '../cidade-form/cidade-form.component';

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.scss']
})
export class CidadeListComponent implements OnInit {

  listaCidades = Array<Cidade>();

  displayedColumns: string[] = ['nome', 'uf', 'acoes'];

  constructor(private cidadeService: CidadeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.cidadeService.getAll().subscribe({
      next: (response: Cidade[]) => {
        this.listaCidades = response;
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
    const dialogRef = this.dialog.open(CidadeFormComponent, {
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
        this.cidadeService.delete(id).subscribe({
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
