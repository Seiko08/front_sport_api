import { Component, Input } from '@angular/core';
import { ApiBackService } from '../../../service/api-back.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-btn-event',
  imports: [CommonModule],
  templateUrl: './delete-btn-event.component.html',
  styleUrl: './delete-btn-event.component.css'
})
export class deleteBtnEventComponent {


@Input() eventId: any;
  constructor(private api: ApiBackService,private readonly router: Router) {
   
  }

  deleteEvent(): void {
    if(!confirm('Voulez-vous supprimer cet événement ?'))
      return;

    this.api.deleteEvent(this.eventId).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
       this.router.navigate(['/profil']);
    });
      },
      error: (err: any) => {
        console.error('Removed failed:', err);
      }

    });
  }

}



