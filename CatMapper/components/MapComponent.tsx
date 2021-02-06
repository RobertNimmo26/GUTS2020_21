import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Heatmap } from "react-native-maps";
import { getCoords } from "../api/database";

//import fetchLocation from "../screens/TabOneScreen";

export default function MapComponent(props: {latitude: number; longitude: number;}) {
  const latitude = props.latitude;
  const longitude = props.longitude;



  console.log(latitude, longitude);

  let points = [
    { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
    { latitude: 6.82776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.81076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83276681, longitude: 79.869319, weight: 1 },
    { latitude: 6.81976681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.867319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.865319, weight: 1 },
    { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
    { latitude: 6.82776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.81076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83276681, longitude: 79.869319, weight: 1 },
    { latitude: 6.81976681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.867319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.865319, weight: 1 },
    { latitude: 6.84076681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
    { latitude: 6.82776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.81076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83276681, longitude: 79.869319, weight: 1 },
    { latitude: 6.81976681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.867319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.865319, weight: 1 },
    { latitude: 6.84076681, longitude: 79.871319, weight: 1 },
    { latitude: 6.841776681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83646681, longitude: 79.77121907, weight: 1 },
    { latitude: 6.82776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83176681, longitude: 79.871319, weight: 1 },
    { latitude: 6.83976681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82776681, longitude: 79.861319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.871319, weight: 1 },
    { latitude: 6.82076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.81076681, longitude: 79.861319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83276681, longitude: 79.869319, weight: 1 },
    { latitude: 6.81976681, longitude: 79.869319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.867319, weight: 1 },
    { latitude: 6.83776681, longitude: 79.865319, weight: 1 },
    { latitude: 6.84076681, longitude: 79.871319, weight: 1 },
    { latitude: 6.841776681, longitude: 79.869319, weight: 1 },
    { latitude: 6.84076681, longitude: 79.871319, weight: 1 },
  ];
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
      >
        <Heatmap
          points={[{ latitude: latitude, longitude: longitude, weight: 1 }]}
          opacity={1}
          radius={40}
        />
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
