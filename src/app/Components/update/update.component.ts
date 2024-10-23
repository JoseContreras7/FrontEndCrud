import { Component, OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { PeopleService } from '../../Services/PeopleService';
import { People } from '../../Models/People';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
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
       this.peopleService.put(this.people)
        .subscribe(
          response => {
            console.log('Se actualizo correctamente la persona:', response);
            this._route.navigate(['/home']);
          },
          error => {
            console.error('Error al actualizar la persona:', error);
          }
        );
  }
}
