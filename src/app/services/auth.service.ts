import { User } from "./../../../interfaces";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Store } from "../store";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  UID: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store,
    private router: Router
  ) {
    this.afAuth.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            this.UID = user.uid;
            return this.fireStore.doc<User>(`users/${user.uid}`).get();
          } else {
            return of(null);
          }
        }),
        tap((snap) => {
          if (snap) this.store.set("user", snap.data());
        })
      )
      .subscribe();
  }

  loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl("auth/login");
  }

  createUser(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        //set default data if new user
        this.setUserData(credential.user);
      });
  }

  //update user info in Firestore
  private setUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(data);
  }

  get authState() {
    return this.afAuth.authState;
  }

  get newUID(): string {
    return this.fireStore.createId();
  }
}
