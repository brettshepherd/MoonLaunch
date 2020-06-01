import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/authGuard.guard";

export enum CompName {
  home = 1,
}

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "home",
    canActivate: [AuthGuard],
    data: { name: CompName.home },
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
