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
      <Text className="p-4 my-auto font-bold text-lg">
        {username}'s activity
      </Text>
      {/* this is where we want the feed of 
      recent reviews for a user to go maybe 3 most recent reviews?*/}
      {user.following.includes(username as string) ? (
        <Pressable onPress={handleUnfollow}>
          <Text className="p-4">{username} is Following</Text>
        </Pressable>
      ) : (
        <Pressable onPress={handleFollow}>
          <Text>Follow</Text>
        </Pressable>
      )}
      <View className="px-4">
        {connections.map((user) => (
          <UserItem key={user} username={user} textModifier="text-lg" />
        ))}
      </View>
    </View>
  );
};

export default UserPage;
