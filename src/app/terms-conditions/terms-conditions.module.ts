import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TermsConditionsComponent } from "./terms-conditions.component";
import { RouterModule, Routes } from "@angular/router";

export const ROUTES: Routes = [
  {
    path: "",
    component: TermsConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), CommonModule],
  declarations: [TermsConditionsComponent]
})
export class TermsConditionsModule {}
