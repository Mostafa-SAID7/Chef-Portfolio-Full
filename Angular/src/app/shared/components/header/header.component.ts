import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
  
  mobileMenuOpen = signal(false);
  
  navLinks = [
    { path: '/', label: 'Home', labelAr: 'الرئيسية' },
    { path: '/about', label: 'About', labelAr: 'عني' },
    { path: '/projects', label: 'Projects', labelAr: 'المشاريع' },
    { path: '/contact', label: 'Contact', labelAr: 'اتصل' }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(val => !val);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getLabel(link: any): string {
    return this.languageService.language() === 'ar' ? link.labelAr : link.label;
  }
}
