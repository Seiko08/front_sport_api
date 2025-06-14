import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiBackService } from '../../../service/api-back.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  events!: any;

  constructor(private api: ApiBackService) {}

  ngOnInit(): void {
    this.api.getEvents().subscribe({
      next: (res: any) => {
        this.events = res;
      },
    });
  }
}
