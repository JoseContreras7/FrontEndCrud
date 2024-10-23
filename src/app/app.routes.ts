import { Routes } from '@angular/router';
import { CreateComponent } from './Components/create/create.component';
import { HomeComponent } from './Components/home/home.component';
import { ListaComponent } from './Components/lista/lista.component';
import { UpdateComponent } from './Components/update/update.component';
import { DeleteComponent } from './Components/delete/delete.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
    children: [
            { 
                path: 'home',
                component: ListaComponent,
            },
            {
                path: 'nuevo',
                component: CreateComponent,
            },
            {
                path: 'delete/:id',
                component: DeleteComponent,
            },
            {
                path: 'editar/:id',
                component: UpdateComponent,
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full',
            },
        ],
    },
];
