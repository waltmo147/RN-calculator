/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: "",
      calculationText: ""
    };
    this.oper = ["C", "DEL", "+", "-", "*", "/"];
    // this.state
  }

  calculateResult() {
    const text = this.state.resultText;
    this.setState({
      calculationText: eval(text)
    });
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
        return false;
    }
    return true;
  }

  buttonPressed(text) {
    console.log(text);
    if (text == "=") {
      return this.validate() && this.calculateResult(this.state.resultText);
    }

    this.setState({
      resultText: this.state.resultText + text
    });
  }

  operate(operation) {
    switch (operation) {
      case "DEL":
        const text = this.state.resultText.split("");
        text.pop();
        this.setState({
          resultText: text.join("")
        });
        break;

      case "C":
        this.setState({
          resultText: "",
          calculationText: ""
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        const lastChar = this.state.resultText.split("").pop();
        if (this.oper.indexOf(lastChar) != -1) {
          return;
        }
        if (this.state.text == "") {
          return;
        }
        this.setState({
          resultText: this.state.resultText + operation
        });
    }
  }

  render() {
    let rows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, "="]];

    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}
          >
            <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }

    let ops = [];
    for (let i = 0; i < 6; i++) {
      ops.push(
        <TouchableOpacity
          key={this.oper[i]}
          style={styles.btn}
          onPress={() => this.operate(this.oper[i])}
        >
          <Text style={styles.white}>{this.oper[i]}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  resultText: {
    fontSize: 35,
    color: "black"
  },
  calculationText: {
    fontSize: 27,
    color: "black"
  },

  btntext: {
    fontSize: 30,
    color: "white"
  },
  white: {
    color: "white",
    fontSize: 25
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  result: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  buttons: {
    flex: 7,
    flexDirection: "row"
  },
  numbers: {
    flex: 3,
    backgroundColor: "#4c4c4c"
  },

  operations: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#636363"
  }
});
