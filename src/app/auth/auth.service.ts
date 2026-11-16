import { Injectable, signal } from '@angular/core';

/**
 * Módulo 7 — Routing Avançado: Auth Guard
 * Serviço simples de autenticação usando signal para controlar o estado de login.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  public readonly isAuthenticated = signal(false);

  login() {
    this.isAuthenticated.set(true);
  }

  logout() {
    this.isAuthenticated.set(false);
  }
}