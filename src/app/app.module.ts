import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [
      HttpClientModule,
    ],
    declarations: [
      AppComponent
    ],
    bootstrap: [
      AppComponent
    ]
  })
  export class AppModule { }