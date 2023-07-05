import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import {NieuwssliderComponent} from "./nieuwsslider.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  providers: [{
    provide: 'isBrowser',
    useValue: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class NieuwssliderModule {}
