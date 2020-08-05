import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="page">
      <router-outlet #myOutlet="outlet"></router-outlet>
    </div>
  `,
  styleUrls: ["./app.component.sass"],
  // animations: RouteAnimations
})
export class AppComponent {
  //-------ROUTER ANIMS------
  // [@routeAnimation]="getDepth(myOutlet)"
  // getDepth(outlet: RouterOutlet) {
  //   let name = outlet.activatedRouteData["name"];
  //   if (name) return name;
  //   else return -1;
  // }
}
