import { Pipe, PipeTransform } from '@angular/core';

/**
 * Módulo 5 — Pipes Customizados
 * Pipe standalone que deixa a primeira letra maiúscula e o restante minúsculo.
 * Ex: "bolo de chocolate" -> "Bolo de chocolate"
 */
@Pipe({ name: 'capitalize', standalone: true })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}