import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AuthSharedModule } from "./../shared/auth-shared.module";
import { LoginComponent } from "./login.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), AuthSharedModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
