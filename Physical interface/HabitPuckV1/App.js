import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
// Navigation

//Screens
import OverviewScreen from "./Components/Overview";
import EffortScreen from "./Components/Effort";
import DoneScreen from "./Components/Done";

//Websocket
import io from "socket.io-client";
const socketEndpoint = "http://localhost:3000";

//Code for the server
//yarn http-server ./dist-withCirclesNew -a 192.168.1.173
//yarn expo export -p web
const createHistoryValues = (todayValue) => {
    const currentDayOfWeek = (new Date().getDay() + 6) % 7; // Shift Sunday (0) to the end
    // makes random numbers except for the todayavlue
    return {
        0: (randomValue = Math.floor(Math.random() * 100) + 1),
        1: (randomValue = Math.floor(Math.random() * 100) + 1),
        2: (randomValue = Math.floor(Math.random() * 100) + 1),
        3: (randomValue = Math.floor(Math.random() * 100) + 1),
        4: (randomValue = Math.floor(Math.random() * 100) + 1),
        5: (randomValue = Math.floor(Math.random() * 100) + 1),
        6: (randomValue = Math.floor(Math.random() * 100) + 1),
        [currentDayOfWeek]: todayValue,
    };
};

export default function App() {
    const [todayValue, setValue] = useState(50);
    const [effortValue, setEffortValue] = useState(50);
    const [habitName, setHabitName] = useState("Press Ups");
    const [goal, setGoal] = useState(100);
    const [streak, setStreak] = useState(7);
    const [width, setWidth] = useState("200");
    const [height, setHeight] = useState("200");
    const [historyValues, setHistoryValues] = useState(
        createHistoryValues(todayValue)
    );
    const [hasConnection, setConnection] = useState(false);
    const [currentScreen, setCurrentScreen] = useState({
        Overview: true,
        Effort: false,
        Done: false,
    });

    useEffect(function didMount() {
        socketStuff();
    }, []);

    const socketStuff = () => {
        const socket = io(socketEndpoint, {
            transports: ["websocket"],
        });

        socket.io.on("open", () => setConnection(true));
        socket.io.on("close", () => setConnection(false));
        socket.on("newTodayValue", (data) => {
            setValue(FloorValue(data.rando));

            setHistoryValues((prevHistoryValues) => ({
                ...prevHistoryValues,
                [(new Date().getDay() + 6) % 7]: FloorValue(data.rando),
            }));
        });
        socket.on("pressed", (data) => {
            switchScreen();
        });
        return function didUnmount() {
            socket.disconnect();
            socket.removeAllListeners();
        };
    };
    const switchScreen = () => {
        if (currentScreen.Overview) {
            currentScreen.Overview = false;
            currentScreen.Effort = true;
            currentScreen.Done = false;
        } else if (currentScreen.Effort) {
            currentScreen.Overview = false;
            currentScreen.Effort = false;
            currentScreen.Done = true;
        } else if (currentScreen.Done) {
            currentScreen.Overview = true;
            currentScreen.Effort = false;
            currentScreen.Done = false;
        }
    };
    const FloorValue = (todayValue) => {
        if (todayValue < 0) {
            return 0;
        }
        if (todayValue > 100) {
            return 100;
        } else return todayValue;
    };

    return (
        <View style={styles.container}>
            {!!currentScreen.Overview && (
                <OverviewScreen
                    props={{
                        todayValue: todayValue,
                        habitName: habitName,
                        goal: goal,
                        streak: streak,
                        width: width,
                        height: height,
                        historyValues: historyValues,
                    }}
                />
            )}
            {!!currentScreen.Effort && (
                <EffortScreen
                    props={{
                        todayValue: todayValue,
                        habitName: habitName,
                        goal: goal,
                        streak: streak,
                        width: width,
                        height: height,
                        historyValues: historyValues,
                    }}
                />
            )}
            {!!currentScreen.Done && (
                <DoneScreen
                    props={{
                        todayValue: todayValue,
                        habitName: habitName,
                        goal: goal,
                        streak: streak,
                        width: width,
                        height: height,
                        historyValues: historyValues,
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
