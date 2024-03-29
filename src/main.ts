/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import routeConfig from './app/routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent,
    {providers: [provideProtractorTestingSupport(), provideHttpClient(), provideRouter(routeConfig), provideAnimations(), provideCharts(withDefaultRegisterables())]})
  .catch(err => console.error(err));
