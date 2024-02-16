import { router } from "expo-router";
import { Pressable, Text } from "react-native";

const UserItem = ({ username }: { username: string }) => {
  return (
    <Pressable onPress={() => router.push(`/(public)/users/${username}`)}>
      <Text>{username}</Text>
    </Pressable>
  );
};

export default UserItem;
