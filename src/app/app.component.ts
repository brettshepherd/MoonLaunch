import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouteAnimations } from "./animations";

@Component({
  selector: "app-root",
  template: `
    <div class="page" [@routeAnimation]="getDepth(myOutlet)">
      <router-outlet #myOutlet="outlet"></router-outlet>
    </div>
  `,
  styleUrls: ["./app.component.sass"],
  animations: RouteAnimations
})
export class AppComponent {
  //-------ROUTER ANIMS------
  getDepth(outlet: RouterOutlet) {
    let name = outlet.activatedRouteData["name"];
    if (name) return name;
    else return -1;
  }
}
