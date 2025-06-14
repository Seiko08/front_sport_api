import { Component } from '@angular/core';
import { RegistrationComponent } from '../../registration/registration.component';
import { LogInComponent } from '../../log-in/log-in.component';


@Component({
  selector: 'app-auth',
  imports: [RegistrationComponent, LogInComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  
}
