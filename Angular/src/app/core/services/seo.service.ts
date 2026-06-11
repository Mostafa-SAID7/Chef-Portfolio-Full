import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string;
  author?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateMeta(config: SEOConfig): void {
    // Update title
    this.title.setTitle(config.title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: config.description });
    
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.author) {
      this.meta.updateTag({ name: 'author', content: config.author });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }
  }

  setCanonicalURL(url: string): void {
    const link: HTMLLinkElement = document.querySelector("link[rel='canonical']") || 
                                   document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    if (!document.querySelector("link[rel='canonical']")) {
      document.head.appendChild(link);
    }
  }
}
