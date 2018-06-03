import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormArticuloComponent } from './articulos/form-articulo/form-articulo.component';


@NgModule({
  declarations: [
    AppComponent,
    FormArticuloComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
