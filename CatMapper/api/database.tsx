import * as firebase from "firebase";
import "firebase/firestore";
import { db } from "../config/keys";

export const addCoords = (
  name: any,
  latitude: any,
  longitude: any,
  description: any
) => {
  db.ref("/cats").push({
    name: name,
    latitude,
    longitude,
    description: description,
    createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
  });
};

export const getCoords = () => {
  db.ref("/cats").once("value", function (snapshot) {
    console.log(snapshot.val());
  });
};
