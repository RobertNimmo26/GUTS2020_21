import * as firebase from "firebase";
import "firebase/firestore";
import { useState } from "react";
import { db } from "../config/keys";

export const addCoords = (
  description: any,
  latitude: any,
  longitude: any,
  location: any
) => {
  db.ref("/cats").push({
    description: description,
    latitude: latitude,
    longitude: longitude,
    location: location,
    createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
  });
};

export const getCats = () => {
  var cats: Object[] = [];

  const ref = db.ref("/cats");
  ref.on(
    "value",
    function (snapshot) {
      // Array of Cats

      // Array of Coordinates

      snapshot.forEach((cat) => {
        // Pushing the Cat object one by one to the array
        cats.push(cat.val());
        // console.log(typeof (cat.val().latitude));
        console.log(cat.val());
      });
    },
    function (errorObject: { code: string }) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  return cats;
};

export const getCoords = () => {
  // Array of Coordinates
  var coords: any[][] = [];

  const ref = db.ref("/cats");
  ref.on(
    "value",
    function (snapshot) {
      // Array of Cats

      snapshot.forEach((cat) => {
        // Pushing the Latitude and Longitude objects pair by pair to the array
        coords.push([cat.val().latitude, cat.val().longitude]);
        //console.log(cat.val().latitude);
      });
    },
    function (errorObject: { code: string }) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  return coords;
};
