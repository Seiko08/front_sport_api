import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthUserService } from './service/user-auth.service';

@Component({
  selector: 'app-root',
   imports: [RouterOutlet,RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  private userSub!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly userAuthService: AuthUserService
  ) {}

   ngOnInit(): void {
    this.userAuthService.user$.subscribe((user:any) => (this.user = user));
  }
  


  logOut(): void {
    this.userAuthService.logout();

    this.router.navigate(['/auth']);
  }

  title = 'front-sport-api';
  
}
