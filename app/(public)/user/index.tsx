import { Text } from "react-native";
import { UserContext } from "../../../contexts/UserContent";
import { useContext } from "react";

const UserPage = () => {
  const { user } = useContext(UserContext);
  return <Text>{user ? user.username : ""}</Text>;
};

export default UserPage;
