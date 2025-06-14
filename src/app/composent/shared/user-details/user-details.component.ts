import { Component, OnInit } from '@angular/core';
import { ApiBackService } from '../../../service/api-back.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: any;




  constructor(
    private api: ApiBackService
  ) { 
  }

  ngOnInit(): void {
    this.api.getUser().subscribe({
      next: (res: any) => {
        this.user = res;
        console.log('User details fetched successfully:', res);
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }



}
