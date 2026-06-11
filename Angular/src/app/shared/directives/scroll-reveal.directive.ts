import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealClass: string = 'reveal-up';
  @Input() threshold: number = 0.1;
  
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Add initial class
    this.el.nativeElement.classList.add(this.revealClass);

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
