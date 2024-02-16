import { router } from "expo-router";
import { Pressable, Text } from "react-native";

const UserItem = ({ username }: { username: string }) => {
  return (
    <Pressable onPress={() => router.push(`/(public)/users/${username}`)}>
      <Text className="py-1 font-semibold text-[#B56DE4]">{username}</Text>
    </Pressable>
  );
};

export default UserItem;
