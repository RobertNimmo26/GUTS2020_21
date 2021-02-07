import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Heatmap } from "react-native-maps";
import { GetCoordsObject, getCoords } from "../api/database";
import { ActivityIndicator } from "react-native-paper";

//import fetchLocation from "../screens/TabOneScreen";

export default function MapComponent(props: {
  latitude: number;
  longitude: number;
}) {
  const latitude = props.latitude;
  const longitude = props.longitude;
  const [catCoords, setCatCoords] = useState([
    { latitude: 0, longitude: 0, weight: 1 },
  ]);

  useEffect(() => {
    (async () => {
      let locs: any = await GetCoordsObject();
      setCatCoords(locs);
    })();
  }, []);

  // console.log("Here is the array: ");
  // console.log(catCoords);

  // let points = [
  //     { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
  //     { latitude: 6.82776681, longitude: 79.871319, weight: 1 },
  //     { latitude: 6.82176681, longitude: 79.871319, weight: 1 },
  //     { latitude: 6.83776681, longitude: 79.871319, weight: 1 },
  //     { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
  //     { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
  //     { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
  //     { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
  //     { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
  // ];

  let points;
  if (catCoords.length === 0) {
    points = [{ latitude: 0, longitude: 0, weight: 1 }];
  } else {
    points = catCoords;
  }
  if (latitude == 0 && longitude == 0) {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        scrollEnabled={true}
      >
        <Heatmap points={points} opacity={1} radius={40} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").height / 3) * 2,
  },
});
