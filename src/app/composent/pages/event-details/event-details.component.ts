import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiBackService } from '../../../service/api-back.service';
import { RouterModule } from '@angular/router';
import { SubsribeBtnComponent } from '../../shared/subsribe-btn/subsribe-btn.component';
import { AuthUserService } from '../../../service/user-auth.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule, SubsribeBtnComponent],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  eventId: string | null = null;
  eventDetails: any | null = null;
  errorMessage: string | null = null;
  listOfParticipants: any[] = [];
  user:any = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiBackService,
    private readonly authService: AuthUserService
  
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.user = this.authService.getUser()

    if (this.eventId) {
      this.api.getEventById(this.eventId).subscribe({
        next: (res: any) => {
          this.eventDetails = res;
          console.log('Event details:', this.eventDetails);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement de l\'événement';
          console.error(err);
        }

      });

    }
    this.api.getParticipants(this.eventId).subscribe({
      next: (res: any) => {
        this.listOfParticipants = res;
        console.log('Participants:', this.listOfParticipants);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des participants', err);
      }
    });
  }
   
}
