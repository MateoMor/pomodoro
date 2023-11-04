import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import { Timer } from "./src/components/Timer";
import { Audio } from "expo-av"; // Librería para poner audio
import AlarmButton from "./src/components/AlarmButton";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK"); // Esto es un enum, una variable que puede tener estados. Por default es "POMO"
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        // Función de js para que se haga algo cada cierta cantidad de tiempo definida
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval); // Previene que el reoj
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev); // Sirve para cambiar el valor de isWorking en el ciclo actual del componente y no en el siguiente, en esta situación el valor de isWorking cambiará al valor contrario
      setTime(currentTime === 0 ? 1500 : currentTime === 1 ? 300 : 900);
    }

    return () => clearInterval(interval);
  }, [isActive, time]); // Se ejecutará cuando se toque el botón y cada vez que cambia time. time cambia un segundo despues de que se ejecutó el setInterval

  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
  };

  // Función para reproducir audio con la librería expo-av"
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    ); // Pide el sonido
    await sound.playAsync(); // Reproduce el sonido
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
          flex: 1, // flex: 1 toma todo el espacio disponible de la pantalla
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>

        <Header
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setIsActive={setIsActive}
        />
        <Timer time={time}></Timer>
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: { fontSize: 32, fontWeight: "bold" },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
