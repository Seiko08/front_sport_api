import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiBackService } from '../../service/api-back.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  submitting = false;
  message = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiBackService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.isError = false;
    this.message = '';

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.api.createUser(this.registrationForm.value).subscribe({
      next: (res:any) => {
        this.message = `Utilisateur créé avec ID ${res.id}`;
        this.registrationForm.reset({ role: 'user' });
      },
      error: (err:Error) => {
        this.isError = true;
        this.message = err?.message || 'Une erreur est survenue.';
      }
    }).add(() => this.submitting = false);
  }
}
