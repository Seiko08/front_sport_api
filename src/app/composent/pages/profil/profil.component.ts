import { Component, OnInit } from '@angular/core';
import { UserDetailsComponent } from '../../shared/user-details/user-details.component';
import { ListOrganisereventComponent } from '../../shared/list-organiserevent/list-organiserevent.component';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../../../service/user-auth.service';

@Component({
  selector: 'app-profil',
  imports: [UserDetailsComponent, ListOrganisereventComponent,CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
user: any = null;

  constructor(
    private readonly authService: AuthUserService)  {


  }

  ngOnInit(): void {
    this.user = this.authService.getUser()
  }

}
