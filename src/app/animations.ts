import { CompName } from "./routing.module";
import {
  trigger,
  transition,
  group,
  query,
  style,
  animate
} from "@angular/animations";

//-----------ROUTE ANIMATIONS------------

let up = [
  query(
    ":enter",
    style({
      transform: "translateY(100%)",
      zIndex: 100,
      boxShadow: "0 -10px 30px 0 rgba(0,0,0,.1)"
    })
  ),
  query(
    ":enter , :leave",
    style({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }),
    { optional: true }
  ),
  query(":enter", [animate(".5s ease", style({ transform: "translateY(0%)" }))])
];

let down = [
  query(
    ":leave",
    style({ zIndex: 100, boxShadow: "0 -10px 30px 0 rgba(0,0,0,.1)" })
  ),
  query(
    ":enter , :leave",
    style({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }),
    { optional: true }
  ),

  query(":leave", [
    animate(".5s ease", style({ transform: "translateY(100%)" }))
  ])
];

let right = [
  query(":enter", style({ transform: "translateX(100%)" })),
  query(
    ":enter , :leave",
    style({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }),
    { optional: true }
  ),
  group([
    query(
      ":leave",
      [animate(".5s ease", style({ transform: "translateX(-100%)" }))],
      { optional: true }
    ),
    query(":enter", [
      animate(".5s ease", style({ transform: "translateX(0%)" }))
    ])
  ])
];

let left = [
  query(":enter", style({ transform: "translateX(-100%)" })),
  query(
    ":enter , :leave",
    style({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }),
    { optional: true }
  ),
  group([
    query(
      ":leave",
      [animate(".5s ease", style({ transform: "translateX(100%)" }))],
      { optional: true }
    ),
    query(":enter", [
      animate(".5s ease", style({ transform: "translateX(0%)" }))
    ])
  ])
];

export const RouteAnimations = [
  trigger("routeAnimation", [
    // // ** TO DATES
    transition(`-1 => ${CompName.home}`, [])
    // transition(`* => ${CompName.dates}`, up),
    // // ** FROM DATES
    // transition(`${CompName.dates} => *`, down),
    // // HOME TO LIKES
    // transition(`${CompName.home} => ${CompName.likes}`, right),
    // // HOME TO TIME
    // transition(`${CompName.home} => ${CompName.time}`, up),
    // // TIME TO LIKES
    // transition(`${CompName.time} => ${CompName.likes}`, right),
    // // LIKES TO HOME
    // transition(`${CompName.likes} => ${CompName.home}`, left),
    // // LIKES TO TIME
    // transition(`${CompName.likes} => ${CompName.time}`, left)
  ])
];
