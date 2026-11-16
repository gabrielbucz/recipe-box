import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

/**
 * Módulo 7 — Routing Avançado: CanActivate
 * Protege rotas que exigem autenticação (criar e editar receitas).
 * Se o usuário não estiver autenticado, redireciona para a home.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};