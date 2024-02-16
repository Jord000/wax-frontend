import { useGlobalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import UserItem from "../../../components/UserItem";
import { UserContext } from "../../../contexts/UserContent";
import { getFollows } from "../../../utils/api";

const CurrentUser = () => {
  const { user } = useContext(UserContext);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { following } = await getFollows(user.username as string);
        setConnections(following);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, []);

  return (
    <View>
      <Text>Username: {user.username}</Text>

      {connections.map((user) => (
        <UserItem key={user} username={user} />
      ))}
    </View>
  );
};

export default CurrentUser;
