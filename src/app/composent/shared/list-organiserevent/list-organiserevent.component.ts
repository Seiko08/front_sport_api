import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ApiBackService } from '../../../service/api-back.service';
import { deleteBtnEventComponent } from '../delete-btn-event/delete-btn-event.component';

@Component({
  selector: 'app-list-organiserevent',
  imports: [CommonModule, RouterModule, deleteBtnEventComponent, RouterLink],
  templateUrl: './list-organiserevent.component.html',
  styleUrl: './list-organiserevent.component.css'
})
export class ListOrganisereventComponent implements OnInit {
  events: any[] = [];
  errorMessage: string | null = null;

  constructor(private api: ApiBackService) {}

  ngOnInit(): void {
    this.api.getEvents().subscribe({
      next: (res: any) => {
        this.events = res;
        console.log('Liste des événements:', this.events);
      },
      error: (err: any) => {
        this.errorMessage = 'Erreur lors du chargement des événements';
        console.error(err);
      }
    });
  }


}
