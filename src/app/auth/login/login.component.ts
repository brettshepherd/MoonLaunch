import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  template: `
    <div>
      <auth-form (submitted)="LoginUser($event)">
        <h1>Welcome Back!</h1>
        <div class="error" *ngIf="error">
          {{ error }}
        </div>
        <button class="actionBtn" type="submit">Login</button>
        <a routerLink="/auth/register">Not Registered?</a>
      </auth-form>
    </div>
  `,
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent {
  error: string;

  constructor(private authServ: AuthService, private router: Router) {}

  async LoginUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authServ.loginUser(email, password);
      this.router.navigate(["/planner"]);
    } catch (err) {
      this.error = err.message;
    }
  }
}
