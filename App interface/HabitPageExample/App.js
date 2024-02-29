import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { useState } from "react";
import HabitPage from "./components/HabitPage";
import LogButton from "./components/LogButton";
import BottomBar from "./components/BottomBar";

export default function App() {
  const [safeAreaDimensions, setSafeAreaDimensions] = useState({
    x: 1,
    y: 1,
    width: 1,
    height: 1,
  });
  const handleSafeAreaLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSafeAreaDimensions({ x, y, width, height });
    console.log("Height", height, "StartY", y);
  };

  return (
    <View style={{ flex: 1 }}>
      {/*This safeAreaView is hidden*/}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }} onLayout={handleSafeAreaLayout}></View>
      </SafeAreaView>
      {/*This safeAreaView is hidden*/}

      {/*Actual app: */}
      <View
        style={{
          position: "absolute",
          top: safeAreaDimensions.y,
          height: Dimensions.get("window").height,
          width: safeAreaDimensions.width,
          backgroundColor: "red",
        }}
      >
        <HabitPage />
      </View>
      {/*Actual app: */}

      {/*Bottom bar: */}
      <BottomBar
        safeAreaDimensions={safeAreaDimensions}
        color={"blue"}
        opacity={0.5}
      ></BottomBar>
      {/*Bottom bar: */}

      {/*This button can log whatever */}
      <LogButton log={safeAreaDimensions}></LogButton>
      {/*This button can log whatever */}
    </View>
  );
}

const styles = StyleSheet.create({});
