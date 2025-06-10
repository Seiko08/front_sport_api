import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiBackService } from './service/api-back.service';
import { RegistrationComponent } from './composent/registration/registration.component';
import { LogInComponent } from './composent/log-in/log-in.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RegistrationComponent, LogInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit {
  title = 'front-sport-api';
  constructor(private readonly apiBackService: ApiBackService) {
  }
  ngOnInit(): void {this.apiBackService.createUser({
  "email": "logan.c@hotmail.com",
  "password": "MySecurePassword123!",
  "firstname": "logan",
  "lastname": "Doe",
  "gender": "man",
  "role": "user",
  "birthday": "2025-06-10"

}).subscribe({
    next: (response: any) => {localStorage.setItem('user', JSON.stringify(response));},
    error: (error) => {console.error('Error during registration:', error)},
    complete: () => {}
  })
  }

}

