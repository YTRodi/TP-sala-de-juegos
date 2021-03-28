import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  exports: [ // Lo exporto para ofrecerselo a otro módulo que use angular material.
    MatSidenavModule
  ]
})
export class MaterialModule { }
