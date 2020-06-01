import { AuthFormComponent } from "./auth-form.component";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent]
})
export class AuthSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthSharedModule,
      providers: []
    };
  }
}
