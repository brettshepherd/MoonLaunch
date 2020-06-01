import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-register",
  template: `
    <div>
      <auth-form (submitted)="RegisterUser($event)">
        <h1>Register</h1>
        <div class="error" *ngIf="error">
          {{ error }}
        </div>
        <button class="actionBtn" type="submit">Create Account</button>
        <a routerLink="/auth/login">Have an account?</a>
      </auth-form>
    </div>
  `,
  styleUrls: ["./register.component.sass"],
})
export class RegisterComponent {
  constructor(private authServ: AuthService, private router: Router) {}

  error: string;

  async RegisterUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authServ.createUser(email, password);
      this.router.navigate(["/planner"]);
    } catch (err) {
      this.error = err.message;
    }
  }
}
