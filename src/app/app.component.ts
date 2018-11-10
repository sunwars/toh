import { Component } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';
import {AuthGuardService} from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toh AAA';

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      timeout: 2000,
      positionClass: 'toast-top-center'
    });

  constructor(public authService: AuthGuardService) {

  }
}
