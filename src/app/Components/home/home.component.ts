import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateComponent } from '../create/create.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CreateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
