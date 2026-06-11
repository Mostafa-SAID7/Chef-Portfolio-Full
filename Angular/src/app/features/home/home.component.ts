import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SEOService } from '../../core/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ProjectsService } from '../projects/services/projects.service';
import { Project } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollRevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private seoService = inject(SEOService);
  private projectsService = inject(ProjectsService);

  featuredProjects: Project[] = [];
  
  heroText = 'Full-Stack Developer';
  heroName = 'Mostafa SAID';
  heroDescription = 'Building exceptional digital experiences with modern web technologies';

  skills = [
    'Angular', 'TypeScript', '.NET Core', 'Tailwind CSS', 
    'Node.js', 'Azure', 'Docker'
  ];

  ngOnInit(): void {
    this.setupSEO();
    this.loadFeaturedProjects();
    this.startTypingEffect();
  }

  private setupSEO(): void {
    this.seoService.updateMeta({
      title: 'Mostafa SAID - Full-Stack Developer Portfolio',
      description: 'Professional portfolio showcasing full-stack development projects, skills, and experience. Specialized in Angular, .NET Core, and modern web technologies.',
      keywords: 'full-stack developer, angular developer, .net developer, web development, portfolio',
      author: 'Mostafa SAID',
      type: 'website'
    });
  }

  private loadFeaturedProjects(): void {
    this.projectsService.getFeaturedProjects().subscribe(projects => {
      this.featuredProjects = projects.slice(0, 3);
    });
  }

  private startTypingEffect(): void {
    // Simple typing effect implementation
    // You can enhance this with a library like typed.js
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  downloadResume(): void {
    // Implement resume download
    window.open('/assets/resume.pdf', '_blank');
  }
}
