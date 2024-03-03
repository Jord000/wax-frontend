import { Pressable, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { getFollows, patchFollows } from "../../../../utils/api";
import UserItem from "../../../../components/UserItem";
import { UserContext } from "../../../../contexts/UserContent";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { username } = useGlobalSearchParams();
  const [connections, setConnections] = useState([]);

  const handleFollow = () => {
    setUser(({ ...current }) => {
      current.following.push(username);
      return current;
    });

    patchFollows(user.username, username as string, true);
  };

  const handleUnfollow = () => {
    setUser(({ ...current }) => {
      const newArray = current.following.filter((user: string) => {
        return user !== username;
      });
      current.following = newArray;
      return current;
    });
    patchFollows(user.username, username as string, false);
  };

  useEffect(() => {
    (async () => {
      try {
        const { following } = await getFollows(username as string);
        setConnections(following);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [username, user]);

  return (
    <View>
      <Text>Username: {username}</Text>
      {user.following.includes(username as string) ? (
        <Pressable onPress={handleUnfollow}>
          <Text>Following</Text>
        </Pressable>
      ) : (
        <Pressable onPress={handleFollow}>
          <Text>Follow</Text>
        </Pressable>
      )}
      {connections.map((user) => (
        <UserItem key={user} username={user} />
      ))}
    </View>
  );
};

export default UserPage;
