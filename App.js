import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

export default function App() {
  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const initializeGame = (n = 1) => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setCurrentPlayer(n);
  };

  const getWinner = () => {
    let sum = 0;
    let arr = gameState;
    let draw = false;

    // check rows
    for (let i = 0; i < 3; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) return 1;
      else if (sum === -3) return -1;
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) return 1;
      else if (sum === -3) return -1;
    }

    // check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) return 1;
    else if (sum === -3) return -1;

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum === 3) return 1;
    else if (sum === -3) return -1;

    // check draw
    let count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (arr[i][j] !== 0) count += 1;
      }
    }
    if (count === 9) {
      draw = true;
    }

    if (draw) {
      return "draw";
    }

    return 0;
  };

  const onTilePress = (row, col) => {
    let value = gameState[row][col];

    if (value !== 0) return;

    let current = currentPlayer;

    // set X or O
    let arr = gameState.slice();
    arr[row][col] = current;
    setGameState(arr);

    // set player
    let nextPlayer = current === 1 ? -1 : 1;
    setCurrentPlayer(nextPlayer);

    // check winner
    let winner = getWinner();
    if (winner === 1) {
      Alert.alert("Player 1 is the winner");
      setPlayer1Score(player1Score + 1);
      initializeGame(nextPlayer);
    } else if (winner === -1) {
      Alert.alert("Player 2 is the winner");
      setPlayer2Score(player2Score + 1);
      initializeGame(nextPlayer);
    } else if (winner === "draw") {
      Alert.alert("Draw");
      initializeGame(nextPlayer);
    }
  };

  const renderIcon = (row, col) => {
    let value = gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name='close' style={styles.tileX} />;

      case -1:
        return <Icon name='circle-outline' style={styles.tileO} />;

      default:
        return <View />;
    }
  };

  const resetScore = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    initializeGame();
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>
        Player1 - X, Player2 - O
      </Text>
      <View style={{ paddingTop: 30 }} />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onTilePress(0, 0)}
          style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}
        >
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(0, 1)}
          style={[styles.tile, { borderTopWidth: 0 }]}
        >
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(0, 2)}
          style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
        >
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onTilePress(1, 0)}
          style={[styles.tile, { borderLeftWidth: 0 }]}
        >
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 1)} style={styles.tile}>
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(1, 2)}
          style={[styles.tile, { borderRightWidth: 0 }]}
        >
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onTilePress(2, 0)}
          style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
        >
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(2, 1)}
          style={[styles.tile, { borderBottomWidth: 0 }]}
        >
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTilePress(2, 2)}
          style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
        >
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 70 }} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Player 1 - {player1Score}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Player 2 - {player2Score}
      </Text>
      <View style={{ paddingTop: 30 }} />
      <Button title='Reset Score' onPress={resetScore} />

      <StatusBar style='auto' />
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
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  tileX: {
    color: "red",
    fontSize: 60,
  },
  tileO: {
    color: "green",
    fontSize: 60,
  },
});
