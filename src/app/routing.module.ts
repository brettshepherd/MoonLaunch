import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export enum CompName {
  home = 1
}

const routes: Routes = [
  {
    path: "home",
    data: { name: CompName.home },
    loadChildren: "./home/home.module#HomeModule"
  },
  {
    path: "terms",
    loadChildren:
      "./terms-conditions/terms-conditions.module#TermsConditionsModule"
  },
  {
    path: "privacy-policy",
    loadChildren: "./privacy-policy/privacy-policy.module#PrivacyPolicyModule"
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
