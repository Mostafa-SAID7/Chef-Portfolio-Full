import { Injectable, signal, effect } from '@angular/core';
import { Theme } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  
  // Signal for reactive theme state
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply theme on initialization
    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  private getInitialTheme(): Theme {
    // Check localStorage
    const stored = localStorage.getItem(this.THEME_KEY) as Theme;
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'dark'; // default
  }

  toggleTheme(): void {
    const newTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(newTheme);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }

    // Save to localStorage
    localStorage.setItem(this.THEME_KEY, theme);
  }

  isDark(): boolean {
    return this.theme() === 'dark';
  }
}
