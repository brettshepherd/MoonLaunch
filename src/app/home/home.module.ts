import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [HomeComponent]
})
export class HomeModule {}
