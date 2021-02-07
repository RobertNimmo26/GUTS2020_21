import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { GetNearestCat, GetCat } from "../api/database";
import { Text } from "../components/Themed";

// import fetchLocation from "../screens/HomeScreen";
// import longitude from "../screens/HomeScreen";
// import latitude from "../screens/HomeScreen";

export default function closestCat(props: {
  Description: string;
  Location: string;
  catLatitude: number;
  catLongitude: number;
}) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [catDescription, setCatDescription] = useState("No cat found 😥");
  const [catLocation, setCatLocation] = useState("");
  const [catLatitude, setCatLatitude] = useState(0);
  const [catLongitude, setCatLongitude] = useState(0);

  let text = (
    <Text>
      {catLatitude} {catLongitude}
    </Text>
  );

  return (
    <View>
      <Button
        icon="compass"
        mode="contained"
        onPress={() => {
          setIsDialogVisible(true);
          setCatLatitude(props.catLatitude);
          setCatLongitude(props.catLongitude);
          setCatDescription(props.Description);
          setCatLocation(props.Location);
        }}
        theme={{ roundness: 40 }}
        style={{
          width: 300,
          margin: 5,
          alignSelf: "center",
        }}
      >
        Nearest Cat
      </Button>
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
          theme={{ roundness: 15 }}
        >
          <Dialog.Title>Here is the closest cat: </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.title}>Last seen:</Text>
            <Text style={styles.normal}>{catDescription}</Text>
            <Text style={styles.title}>Description</Text>
            <Text style={styles.normal}>{catLocation}</Text>
            <Text style={styles.normal}>
              Coords are: {text}
              {"\n"}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  normal: {
    fontSize: 15,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
