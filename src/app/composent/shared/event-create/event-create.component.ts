import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiBackService } from '../../../service/api-back.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css',
})
export class EventCreateComponent implements OnInit {
  eventform!: FormGroup;
  eventId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiBackService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.eventId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.eventId;

    if (this.isEditMode && this.eventId) {
      this.api.getEventById(this.eventId).subscribe({
        next: (eventData: any) => {
          this.eventform.patchValue(eventData);
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l’événement:', err);
        },
      });
    }
  }

  initForm() {
    this.eventform = this.fb.group({
      label: ['', Validators.required],
      date: ['', [Validators.required, this.futureDateValidator()]],
      type: ['', Validators.required],
      address: this.fb.group({
        number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        street: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.eventform.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    if (this.isEditMode && this.eventId) {

      this.api.updateEvent(this.eventform.value, this.eventId).subscribe({
        next: (res: any) => {
          console.log('Événement mis à jour avec succès:', res);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Erreur lors de la mise à jour de l’événement:', err);
        },
      });
    } else {
      this.api.createEvent(this.eventform.value).subscribe({
        next: (res: any) => {
          console.log('Événement créé avec succès:', res);
          this.eventform.reset();
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Erreur lors de la création de l’événement:', err);
        },
      });
    }
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate <= today) {
        return { pastDate: true };
      }
      return null;
    };
  }
}
