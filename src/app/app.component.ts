import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RagtherWebUI';
}
