import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  getTranslatedTag(tag: string): string {
    switch (tag) {
      case 'Rouge':
        return 'URGENT';
      case 'Bleu':
        return 'IMPORTANT';
      case 'Vert':
        return 'GÉRABLE';
      case 'Jaune':
        return 'EN ATTENTE';
      default:
        return tag;
    }
  }
}
