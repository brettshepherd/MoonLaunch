import { Component, OnInit } from "@angular/core";

@Component({
  selector: "terms-conditions",
  template: `
  <div class="wrapper">
    <iframe src="/assets/HTML/terms-conditions.html" frameborder="0"></iframe>
  </div>
  
  `,
  styleUrls: ["./terms-conditions.component.sass"]
})
export class TermsConditionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
