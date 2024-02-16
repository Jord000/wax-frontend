import { Text, View } from "react-native";
import {  useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { getFollows } from "../../../../utils/api";
import UserItem from "../../../../components/UserItem";

const UserPage = () => {
  const { username } = useGlobalSearchParams();
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { following } = await getFollows(username as string);
        setConnections(following);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [username]);

  return (
    <View>
      <Text>Username: {username}</Text>

      {connections.map((user) => (
        <UserItem key={user} username={user} />
      ))}
    </View>
  );
};

export default UserPage;
