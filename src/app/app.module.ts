import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { AppRoutingModule } from "./routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Store } from "./store";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

const config = {
  apiKey: "<your-key>",
  authDomain: "<your-project-authdomain>",
  databaseURL: "<your-database-URL>",
  projectId: "<your-project-id>",
  storageBucket: "<your-storage-bucket>",
  messagingSenderId: "<your-messaging-sender-id>",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule,
    // HttpClientJsonpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
  ],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
