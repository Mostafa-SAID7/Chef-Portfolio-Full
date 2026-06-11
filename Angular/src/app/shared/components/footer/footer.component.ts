import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Mostafa-SAID7',
      icon: 'github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'linkedin'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'twitter'
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: 'email'
    }
  ];

  quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' }
  ];
}
