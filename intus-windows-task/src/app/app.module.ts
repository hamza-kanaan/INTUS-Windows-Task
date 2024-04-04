import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { AppConfigService } from './services/app-config.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupAppConfigServiceFactory,
      deps: [
        AppConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function setupAppConfigServiceFactory(service: AppConfigService): Function {
  return () => service.load();
}