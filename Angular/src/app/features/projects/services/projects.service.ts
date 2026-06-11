import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { Project } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private projectsData: Project[] | null = null;

  getAllProjects(): Observable<Project[]> {
    if (this.projectsData) {
      return of(this.projectsData);
    }
    
    return this.http.get<Project[]>('/assets/data/projects.json').pipe(
      map(projects => {
        // Convert date strings to Date objects
        this.projectsData = projects.map(p => ({
          ...p,
          date: new Date(p.date)
        }));
        return this.projectsData;
      })
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map(projects => projects.filter(p => p.featured))
    );
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return this.getAllProjects().pipe(
      map(projects => projects.find(p => p.id === id))
    );
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    if (category === 'all') {
      return this.getAllProjects();
    }
    
    return this.getAllProjects().pipe(
      map(projects => projects.filter(p => p.category === category))
    );
  }

  getProjectsByTechnology(tech: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map(projects => projects.filter(p => 
        p.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
      ))
    );
  }

  searchProjects(query: string): Observable<Project[]> {
    const lowerQuery = query.toLowerCase();
    return this.getAllProjects().pipe(
      map(projects => projects.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.technologies.some(t => t.toLowerCase().includes(lowerQuery))
      ))
    );
  }
}
