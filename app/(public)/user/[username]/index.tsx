import { Text, View } from "react-native";
import { UserContext } from "../../../../contexts/UserContent";
import { useContext } from "react";
import { useGlobalSearchParams } from "expo-router";

const UserPage = () => {
  const { user } = useContext(UserContext);
  const { username } = useGlobalSearchParams();

  return (
    <View>
      <Text>Username: {username}</Text>;
      <Text>
        Logged in user: {user.username == username ? "True" : "False"}
      </Text>
    </View>
  );
};

export default UserPage;
