import { useContext, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import UserItem from "../../../components/UserItem";
import { UserContext } from "../../../contexts/UserContent";
import { supabase } from "../../../lib/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CurrentUser = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("username");
    setUser({ username: "", following: [] });
    router.replace(`/(auth)/`);
  };

  useEffect(() => {
    !user.username && router.push(`/(auth)/`);
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-between">
        <Text className="p-4 my-auto font-bold text-lg">
          Hello {user.username}!
        </Text>
        <Pressable
          onPress={handleSignOut}
          className="bg-black w-auto min-w-[30%]  m-4 p-2 flex-row rounded-xl border-x border-b border-stone-500"
        >
          <Text className="text-white text-lg w-auto m-auto">Sign Out</Text>
        </Pressable>
      </View>
      <View>
        <Text className="p-4 my-auto font-bold text-lg">Recent Activity</Text>
        {/* this is where we want the recent 
        reviewed music to go last 3 reviews?*/ }
      </View>
      <Text className="p-4">You are folowing :</Text>

      <View className="px-4">
        {user.following.map((user) => (
          <UserItem key={user} username={user} textModifier="text-lg" />
        ))}
      </View>
    </View>
  );
};

export default CurrentUser;
