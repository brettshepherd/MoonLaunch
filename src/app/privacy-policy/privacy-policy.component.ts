import { Component, OnInit } from "@angular/core";

@Component({
  selector: "privacy-policy",
  template: `
  <div class="wrapper">
    <iframe src="assets/HTML/privacy-policy2.html" frameborder="0"></iframe>
  </div>
    
  `,
  styleUrls: ["./privacy-policy.component.sass"]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
