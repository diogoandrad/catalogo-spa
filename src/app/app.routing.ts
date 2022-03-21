import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './components/pessoa/pessoa-form/pessoa-form.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'pessoa',
        children: [
          {
            path: '',
            component: PessoaListComponent
          },
          {
            path: 'cadastrar',
            component: PessoaFormComponent
          },
          {
            path: 'editar/:id',
            component: PessoaFormComponent
          }
        ]
      },
      {
        path: 'cidade',
        children: [
          {
            path: '',
            component: CidadeListComponent
          },
          {
            path: 'cadastrar',
            component: CidadeFormComponent
          },
          {
            path: 'editar/:id',
            component: CidadeFormComponent
          }
        ]
      }
    ]
  }
];
