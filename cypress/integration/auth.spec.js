/// <reference types="cypress"/>

const chance = require("chance").Chance();

//EXAMPLE SIGN UP

describe("Authetication", () => {
  const username = chance.word({ length: chance.integer({ min: 5, max: 15 }) });
  const emailValid = chance.email();
  const emailInValid = "fakeEmail.biz";
  const passValid = "ValidPassword";
  const passInvalid = "ValidPassword";

  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Register Successfully", () => {
    cy.pause();
    cy.wait(2000);
    //logout if logged in
    cy.logout();

    //click register
    cy.contains("Register").click();

    //fill in form
    cy.get("input[name=email]").type(emailValid);
    cy.get("input[name=username]").type(username);
    cy.get("input[name=password]").type(passValid);

    //Submit form
    cy.get("button[type=submit]").click();

    //Asset Profile Pic Popup
    cy.contains("Add A Profile Picture");

    //close modal
    cy.get("auth-modal")
      .find(".fa-times")
      .click();
  });
});
