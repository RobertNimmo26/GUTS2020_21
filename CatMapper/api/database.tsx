import * as firebase from "firebase";
import "firebase/firestore";
import { db } from "../config/keys";

export const addCoords = (name: any, log: any, lat: any, description: any) => {
  db.ref("/cats").push({
    name: name,
    log: log,
    lat: lat,
    description: description,
    createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
  });
};

// export const getCoords = () => {
//   db.ref("/cats").once({
//     name: name,
//     log: log,
//     lat: lat,
//     description: description,
//     createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
//   });
// };
