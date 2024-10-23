import { Component,OnInit,inject } from '@angular/core';
import { PeopleService } from '../../Services/PeopleService';
import { People } from '../../Models/People';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent  implements OnInit {
  private _activeRoute = inject(ActivatedRoute);
  private _route = inject(Router);
  ListPeople : People[] = [];
  foundPeople: any;
  people: People = {
    id: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    edad: 0,
  };

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (id) {
       this.peopleService.dataPeople$.subscribe(response => {
           if (response!== undefined){  
             this.ListPeople = response;
             this.foundPeople = this.ListPeople.find(peopleInfo => peopleInfo.id===Number(id));
           }
         },error => {
           console.error('Error al realizar la consulta:', error);
         }
       )
       if (this.foundPeople!== undefined){
         this.people = this.foundPeople;
       }

    }
  }

  onSubmit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    this.peopleService.Delete(Number(id)).subscribe({
      next: response => {
        console.log('Persona eliminado:', response);
        this._route.navigate(['/home']);
      },
      error: err => {
        console.error('Error al eliminar:', err);
      }
    });;
    
  }

}
