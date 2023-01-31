import {animate, group, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Selectie => Speler', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%'
        })
      ], { optional: true }),
      group([
        query(':enter', [
          animate('100ms ease-out', keyframes([
            style({opacity:0, transform: 'translateY(-5%)'}),
            style({ opacity: 1, transform: 'translateY(0%)'}),
          ]))
        ]),
        query(':leave', [
          animate('100ms ease-out', keyframes([
            style({opacity:1, transform: 'translateY(0%)'}),
            style({ opacity: 0, transform: 'translateY(5%)'}),
          ]))
        ])
      ])
    ]),
    transition('Speler => Selectie', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%'
        })
      ], { optional: true }),
      group([
        query(':enter', [
          animate('100ms ease-out', keyframes([
            style({opacity:0, transform: 'translateY(5%)'}),
            style({ opacity: 1, transform: 'translateY(0%)'}),
          ]))
        ]),
        query(':leave', [
          animate('100ms ease-out', keyframes([
            style({opacity:1, transform: 'translateY(0%)'}),
            style({ opacity: 0, transform: 'translateY(-5%)'}),
          ]))
        ])
      ])
    ])
  ]);
