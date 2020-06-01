import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthSharedModule } from "./shared/auth-shared.module";

export const ROUTES: Routes = [
  {
    path: "",
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      {
        path: "login",
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "register",
        loadChildren: () =>
          import("./register/register.module").then((m) => m.RegisterModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AuthSharedModule.forRoot(),
  ],
})
export class AuthModule {}
