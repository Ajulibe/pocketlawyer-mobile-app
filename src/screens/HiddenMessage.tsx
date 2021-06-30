import * as React from "react";
import {TouchableOpacity, Text} from "react-native";

const QuestionsButton: React.FC = () => {
  const [color, setColor] = React.useState("red");
  const [btnTitle, setBtnTitle] = React.useState("Delete item");
  const [isDisabled, setIsDisabled] = React.useState(false);
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => {
        setColor("blue");
        setBtnTitle("color changed");
        setIsDisabled(true);
      }}
      accessibilityRole={"button"}
      accessibilityLabel={"upvote count"}
      style={{backgroundColor: color}}>
      <Text>{btnTitle}</Text>
    </TouchableOpacity>
  );
};

export default QuestionsButton;
