import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PeopleService } from '../../Services/PeopleService';
import { People } from '../../Models/People';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  ListPeople : People[] = [];

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
       this.peopleService.get(this.people.nombre)
        .subscribe(
          response => {
            this.ListPeople = response;
            this.peopleService.setPeople(this.ListPeople);
            console.log('Se encontro información:', response);
          },
          error => {
            console.error('Error al realizar la consulta:', error);
          }
        );
  }
}
