import { trigger, animate, transition, style, query, animateChild } from '@angular/animations';

export const fadeAnimation =
    // // trigger name for attaching this animation to an element using the [@triggerName] syntax
    // trigger('fadeInAnimation', [
    //     // route 'enter' transition
    //     transition('* <=> *', [
    //       query(':enter, :leave',[
    //         // css styles at start of transition
    //         style({ opacity: 0 }),
    //         // animation and styles at end of transition
    //       ]),
    //       query(':enter', [
    //         animate('.5s', style({ opacity: 1 }))
    //       ]),
    //     ]),
    // ]);
    trigger('fadeAnimation', [

      transition( '* => *', [

          query(':enter',
              [
                  style({ opacity: 0 })
              ],
          ),

          query(':leave',
              [
                  style({ opacity: 1 }),
                  animate('0.2s', style({ opacity: 0 }))
              ],
          ),

          query(':enter',
              [
                  style({ opacity: 0 }),
                  animate('0.2s', style({ opacity: 1 }))
              ],
          )

      ])

  ]);

