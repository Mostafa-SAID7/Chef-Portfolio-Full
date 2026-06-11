import { 
  trigger, 
  transition, 
  style, 
  animate, 
  query, 
  stagger,
  AnimationTriggerMetadata 
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('600ms ease-out', style({ opacity: 1 }))
  ])
]);

export const slideInUp = trigger('slideInUp', [
  transition(':enter', [
    style({ transform: 'translateY(40px)', opacity: 0 }),
    animate('600ms cubic-bezier(0.22, 1, 0.36, 1)', 
            style({ transform: 'translateY(0)', opacity: 1 }))
  ])
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-40px)', opacity: 0 }),
    animate('600ms cubic-bezier(0.22, 1, 0.36, 1)', 
            style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

export const staggerAnimation = trigger('stagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('400ms ease-out', 
                style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' })
    ], { optional: true }),
    query(':leave', [
      animate('300ms ease-out', 
              style({ opacity: 0, transform: 'translateY(-20px)' }))
    ], { optional: true }),
    query(':enter', [
      animate('300ms 100ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);
