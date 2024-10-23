import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { PeopleService } from '../../Services/PeopleService';
import { People } from '../../Models/People';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateComponent {
  private _route = inject(Router);
  people: People = {
    id: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    edad: 0,
  };

  constructor(private peopleService: PeopleService) { }

 
  onSubmit() {
       this.peopleService.post(this.people)
        .subscribe(
          response => {
            console.log('Se creo correctamente la persona:', response);
            this._route.navigate(['/home']);
          },
          error => {
            console.error('Error al crear la persona:', error);
          }
        );
  }
}
