import { Component, Input } from '@angular/core';
import { ApiBackService } from '../../../service/api-back.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subsribe-btn',
  imports: [CommonModule],
  templateUrl: './subsribe-btn.component.html',
  styleUrl: './subsribe-btn.component.css'
})
export class SubsribeBtnComponent {


@Input() eventId: any;
  constructor(private api: ApiBackService,private readonly router: Router) {
   
  }

  subscribeToEvent(): void {

    this.api.RegisterEvent({eventId: this.eventId}).subscribe({
      next: (res: any) => {
        console.log('Subscription successful:', res);
        alert('Vous êtes maintenant inscrit à cet événement !');
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Subscription failed:', err);
      }

    });
  }

}
