import { useContext, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import UserItem from "../../../components/UserItem";
import { UserContext } from "../../../contexts/UserContent";
import { supabase } from "../../../lib/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CurrentUser = () => {
  const { user, setUser } = useContext(UserContext);
  /* const [activity, setActivity] = useState([])*/

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("username");
    setUser({ username: "", following: [] });
    router.replace(`/(auth)/`);
  };

  useEffect(() => {
    /* make the request for activity and set state here?*/
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
        reviewed music to go... last 3 reviews?
        seperate get request per the user.username and add that to a new piece of state?
          
        once in styling will need messing with, 
        could have writing on the right of the album instead of underneath
        display in a column rather than a grid.
        
        {activity.map((track)=>(
            <Pressable
                key={track.music_id}
                onPress={() => router.push(`/(auth)/music/${track.music_id}`)}
                className="w-1/2 h-auto"
              >
                <View
                  key={track.music_id}
                  className=" p-4 bg-white rounded-lg items-center justify-center"
                >
                  <Image
                    source={{ uri: track.album_img }}
                    className="w-40 h-40  rounded-lg"
                  />
                  <Text className="text-center py-1">{track.artist_names}</Text>
                  <Text className="text-center">{track.name}</Text>
                </View>
              </Pressable>)
        )}
        
        */}
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
