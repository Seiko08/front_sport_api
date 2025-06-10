import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiBackService } from '../../service/api-back.service';


@Component({
  selector: 'app-log-in',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  submitting = false;
  message = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiBackService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  onSubmit(): void {
    this.isError = false;
    this.message = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.api.connexion(this.loginForm.value).subscribe({
      next: (res:any) => {
        this.message = `Connection réussie ${res.id}`;
        localStorage.setItem('token', res.token);
      },
      error: (err:Error) => {
        this.isError = true;
        this.message = err?.message || 'Une erreur est survenue.';
        
      }}).add(() => this.submitting = false);
  
}

}
