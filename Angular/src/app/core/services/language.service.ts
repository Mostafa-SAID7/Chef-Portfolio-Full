import { Injectable, signal, effect } from '@angular/core';
import { Language } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANG_KEY = 'portfolio-language';
  
  language = signal<Language>(this.getInitialLanguage());

  constructor() {
    effect(() => {
      this.applyLanguage(this.language());
    });
  }

  private getInitialLanguage(): Language {
    const stored = localStorage.getItem(this.LANG_KEY) as Language;
    if (stored) return stored;

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ar') return 'ar';

    return 'en'; // default
  }

  toggleLanguage(): void {
    const newLang = this.language() === 'en' ? 'ar' : 'en';
    this.language.set(newLang);
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
  }

  private applyLanguage(lang: Language): void {
    const html = document.documentElement;
    
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    localStorage.setItem(this.LANG_KEY, lang);
  }

  isRTL(): boolean {
    return this.language() === 'ar';
  }
}
