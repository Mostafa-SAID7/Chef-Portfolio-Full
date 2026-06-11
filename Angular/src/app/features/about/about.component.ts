import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SEOService } from '../../core/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Skill, Experience } from '../../core/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  private http = inject(HttpClient);
  private seoService = inject(SEOService);

  skills = signal<Skill[]>([]);
  experiences = signal<Experience[]>([]);
  
  skillCategories = ['frontend', 'backend', 'tools', 'design', 'soft-skills'];

  ngOnInit(): void {
    this.setupSEO();
    this.loadSkills();
    this.loadExperience();
  }

  private setupSEO(): void {
    this.seoService.updateMeta({
      title: 'About - Mostafa SAID',
      description: 'Learn more about my skills, experience, and journey as a full-stack developer. Specialized in Angular, .NET Core, and modern web technologies.',
      keywords: 'about, skills, experience, developer bio, professional background'
    });
  }

  private loadSkills(): void {
    this.http.get<Skill[]>('/assets/data/skills.json').subscribe(skills => {
      this.skills.set(skills);
    });
  }

  private loadExperience(): void {
    this.http.get<Experience[]>('/assets/data/experience.json').subscribe(exp => {
      const experiences = exp.map(e => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: e.endDate ? new Date(e.endDate) : undefined
      }));
      this.experiences.set(experiences);
    });
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills().filter(s => s.category === category);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  downloadResume(): void {
    window.open('/assets/resume.pdf', '_blank');
  }
}
