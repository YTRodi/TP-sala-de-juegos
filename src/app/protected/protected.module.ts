import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProtectedRoutingModule } from './protected-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';


@NgModule({
  declarations: [
    HomeComponent, 
    AboutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
