import { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import ProgressBar from "./ProgressBar";
import OverviewInformation from "./OverviewInformation";
import WeekHistory from "./WeekHistory";
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web

export default function Effort({ props }) {
    const { count, habitName, target, streak, width, height } = props;

    return (
        <View style={styles.container}>
            <ProgressBar
                target={target}
                count={count}
                width={width}
                height={height}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
