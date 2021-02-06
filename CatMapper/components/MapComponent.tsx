import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import ENV from "../config/env";

export default function MapComponent(props: { latitude: number; longitude: number }) {
  let latitude = props.latitude;
  let longitude = props.longitude;




  return (
    <View style={styles.container}>
      <MapView 
      initialRegion={{
        latitude: latitude,
        longitude: longitude
          }}
      style={styles.map} 
      showsUserLocation={true} />
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
