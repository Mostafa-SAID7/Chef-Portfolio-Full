import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from './services/projects.service';
import { SEOService } from '../../core/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Project } from '../../core/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  private seoService = inject(SEOService);

  allProjects: Project[] = [];
  filteredProjects = signal<Project[]>([]);
  selectedCategory = signal<string>('all');
  
  categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'Design' }
  ];

  ngOnInit(): void {
    this.setupSEO();
    this.loadProjects();
  }

  private setupSEO(): void {
    this.seoService.updateMeta({
      title: 'Projects - Mostafa SAID Portfolio',
      description: 'Browse through my portfolio of web development projects including full-stack applications, frontend designs, and backend APIs.',
      keywords: 'projects, portfolio, web development, angular projects, .net projects'
    });
  }

  private loadProjects(): void {
    this.projectsService.getAllProjects().subscribe(projects => {
      this.allProjects = projects;
      this.filteredProjects.set(projects);
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    
    if (category === 'all') {
      this.filteredProjects.set(this.allProjects);
    } else {
      const filtered = this.allProjects.filter(p => p.category === category);
      this.filteredProjects.set(filtered);
    }
  }

  isActiveCategory(category: string): boolean {
    return this.selectedCategory() === category;
  }
}
