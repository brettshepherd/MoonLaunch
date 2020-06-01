import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "auth-form",
  styleUrls: ["auth-form.component.sass"],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="OnSubmit()">
        <ng-content select="h1"></ng-content>

        <label [class.isFocused]="emailFocused">
          Email
          <input
            autocomplete="username"
            (focus)="emailFocused = true"
            (blur)="emailFocused = false"
            type="email"
            formControlName="email"
          />
        </label>

        <label [class.isFocused]="passFocused">
          Password
          <input
            autocomplete="current-password"
            (focus)="passFocused = true"
            (blur)="passFocused = false"
            type="password"
            formControlName="password"
          />
        </label>

        <div class="error" *ngIf="emailFormat">
          Invalid email format.
        </div>
        <div class="error" *ngIf="passwordInvalid">
          Password is Required.
        </div>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__button">
          <ng-content select=".actionBtn"></ng-content>
        </div>

        <div class="auth-form__toggleLink">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `,
})
export class AuthFormComponent {
  @Output() submitted = new EventEmitter<FormGroup>();
  emailFocused: boolean = false;
  passFocused: boolean = false;

  form = this.fb.group({
    email: ["", Validators.email],
    password: ["", Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  OnSubmit() {
    if (this.form.valid) {
      //emit
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get("password");
    return control.hasError("required") && control.touched;
  }

  get emailFormat() {
    const control = this.form.get("email");
    return control.hasError("email") && control.touched;
  }
}
