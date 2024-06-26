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
        <View style={{ flex: 1, backgroundColor: "khaki" }}>
            {/*Actual app: */}
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }} onLayout={handleSafeAreaLayout}>
                    <HabitPage />
                    <BottomBar
                        safeAreaDimensions={safeAreaDimensions}
                        color={"tomato"}
                        opacity={0.66} //{0.96}
                    />
                </View>
            </SafeAreaView>
            {/*Actual app: */}
        </View>
    );
}

const styles = StyleSheet.create({});
