import React, { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { addCoords } from "../api/database";

// import fetchLocation from "../screens/HomeScreen";
// import longitude from "../screens/HomeScreen";
// import latitude from "../screens/HomeScreen";

export default function AddCat(props: { latitude: number; longitude: number }) {
  const [description, setInputDesciption] = useState("");
  const [location, setInputLocation] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const latitude = props.latitude;
  const longitude = props.longitude;
  //console.log(longitude, latitude, "test");
  return (
    <View>
      <Button
        icon="cat"
        mode="contained"
        onPress={() => {
          setIsDialogVisible(true);
          setInputDesciption("");
          setInputLocation("");
        }}
        theme={{ roundness: 40 }}
        style={{
          width: 200,
          margin: 22,
          alignSelf: "center",
        }}
      >
        Found a cat!
      </Button>
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
          theme={{ roundness: 15 }}
        >
          <Dialog.Title>Lets add a cat!</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Description of cat?"
              value={description}
              onChangeText={(text) => setInputDesciption(text)}
            />
            <TextInput
              label="Where did you see it?"
              value={location}
              onChangeText={(text) => setInputLocation(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setIsDialogVisible(false);
                console.log(longitude, latitude, description, location);
                addCoords(description, latitude, longitude, location);
              }}
            >
              Share with cat lovers nearby!
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
