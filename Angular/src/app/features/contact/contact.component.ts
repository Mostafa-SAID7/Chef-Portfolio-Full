import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SEOService } from '../../core/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SEOService);

  contactForm!: FormGroup;
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com'
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+1 (234) 567-8900',
      link: 'tel:+12345678900'
    },
    {
      icon: 'location',
      label: 'Location',
      value: 'Your City, Country',
      link: null
    }
  ];

  ngOnInit(): void {
    this.setupSEO();
    this.initializeForm();
  }

  private setupSEO(): void {
    this.seoService.updateMeta({
      title: 'Contact - Mostafa SAID',
      description: 'Get in touch with me for project collaborations, freelance work, or just to say hello.',
      keywords: 'contact, hire developer, freelance, collaboration'
    });
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.submitSuccess.set(false);
      this.submitError.set(false);

      // Simulate API call (replace with actual API call)
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => this.submitSuccess.set(false), 5000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `Minimum ${minLength} characters required`;
      }
    }
    return '';
  }

  hasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.touched && field?.errors);
  }
}
