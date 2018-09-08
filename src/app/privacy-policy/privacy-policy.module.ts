import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivacyPolicyComponent } from "./privacy-policy.component";
import { RouterModule, Routes } from "@angular/router";

export const ROUTES: Routes = [
  {
    path: "",
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), CommonModule],
  declarations: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule {}
