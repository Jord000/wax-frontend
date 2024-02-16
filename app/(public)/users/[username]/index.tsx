import { Pressable, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { getFollows, patchFollows } from "../../../../utils/api";
import UserItem from "../../../../components/UserItem";
import { UserContext } from "../../../../contexts/UserContent";

const UserPage = () => {
  const { user } = useContext(UserContext);
  const { username  } = useGlobalSearchParams();
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
      <Pressable onPress={() => patchFollows(user.username, username as string)}>
        <Text>Follow</Text>
      </Pressable>
      {connections.map((user) => (
        <UserItem key={user} username={user} />
      ))}
    </View>
  );
};

export default UserPage;
