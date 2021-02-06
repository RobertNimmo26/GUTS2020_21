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
        latitude: latitude,
        longitude: longitude,
        description: description,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
    });
};

export const getCoords = () => {
    
    const ref = db.ref("/cats"); 
    ref.on("value", function(snapshot: any[]){
        // Array of Cats
        var cats: Object[] = [];
        // Array of Coordinates
        var coords = [];
        snapshot.forEach((cat) => {
            // Pushing the Cat object one by one to the array
            cats.push(cat.val());
            // Pushing the Latitude and Longitude objects pair by pair to the array
            coords.push([cat.val().latitude, cat.val().longitude]);
            // console.log(typeof (cat.val().latitude));
            console.log((cat.val()));
        })
        return cats;



    }, function (errorObject: { code: string; }) {
        console.log("The read failed: " + errorObject.code);
    });



    // const cats: { [index: string]: never[] } = [];
    // const ref = db.ref("/cats");
    // ref.once("value", (snapshot) => {
    //   snapshot.forEach((snapshotchild) => {
    //     snapshotchild.forEach((data) => {
    //       const obj = {};
    //       Object.keys(cats).forEach((item) => {
    //         obj[cats[item].name] = {
    //           latitude: cats[item].latitude,
    //           longitude: cats[item].longitude,
    //         };
    //       });
    //       console.log(obj);
    //     });
    //   });
    // });
};
