import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export enum CompName {
  home = 1,
}

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
