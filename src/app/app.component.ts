import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  ISconnected = localStorage.getItem('token') !== null;
  
  constructor( private readonly router: Router) {}

  title = 'front-sport-api';

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/auth']);
  }


 
}

