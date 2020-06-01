import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AuthSharedModule } from "./../shared/auth-shared.module";
import { RegisterComponent } from "./register.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), AuthSharedModule],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
