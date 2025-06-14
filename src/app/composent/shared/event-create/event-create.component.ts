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
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css',
})
export class EventCreateComponent implements OnInit {
  eventform!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiBackService, private router: Router) {}

  ngOnInit(): void {
    this.eventform = this.fb.group({
      label: ['', Validators.required],
      date: ['', [Validators.required, this.futureDateValidator()]],
      type: ['', Validators.required],
      address: this.fb.group({
        number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        street: ['', [Validators.required]],
        postalCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{4}$')],
        ],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }),
    });
  }

  onSubmit() {
    if (this.eventform.valid) {
      this.api.createEvent(this.eventform.value).subscribe({
        next: (res: any) => {
          console.log('Event created successfully:', res);
          this.eventform.reset();
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Error creating event:', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // ignore l'heure
      if (inputDate <= today) {
        return { pastDate: true };
      }
      return null;
    };
  }
}
