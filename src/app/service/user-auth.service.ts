import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private userSubject: BehaviorSubject<any | null>;
  public user$: Observable<any | null>;

  constructor() {
    const storedUser = localStorage.getItem('user');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;

    this.userSubject = new BehaviorSubject<any | null>(initialUser);
    this.user$ = this.userSubject.asObservable();
  }

  // Setter : met à jour le user + localStorage + stream
  setUser(user: any | null): void {
    this.userSubject.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  // Getter classique
  getUser(): any | null {
    return this.userSubject.value;
  }

  // Vérifie si un utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  // Déconnexion
  logout(): void {
    this.setUser(null);
  }
}