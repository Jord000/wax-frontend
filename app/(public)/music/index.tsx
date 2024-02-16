import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { getMusic } from "../../../utils/api";
import { Music } from "../../../types/front-end";
import SearchDropDown from "../../../components/SearchDropDown";
import { Ionicons } from "@expo/vector-icons";
import SearchFilterBar from "../../../components/SearchFilterBar";
import { UserContext } from "../../../contexts/UserContent";

const Albums = () => {
  const [music, setMusic] = useState<Music[]>([]);
  const [dropDVis, setDropDVis] = useState(false);
  const [isSpotifySearched, setIsSpotifySearched] = useState(false);
  const [searchedUpMusic, setSearchedUpMusic] = useState<Music[]>([]);
  const [searchText, setSearchText] = useState(" ");
  const [isLoading, setisLoading] = useState(true);
  const { user} = useContext(UserContext)

  useEffect(() => {
    const doThis = async () => {
      const musicData = await getMusic();
      setMusic(musicData);
      setisLoading(false);
    };
    doThis();
  }, [isSpotifySearched]);

  if (isLoading) {
    return (
      <View className="mt-[100%]">
        <ActivityIndicator
          size="large"
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          color="#B56DE4"
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          setDropDVis(false);
        }}
      >
        <View className="w-full h-[9%] flex-row items-center justify-around mt-[4%] bg-[#B56DE4] ">
          <Pressable
            className={`items-center mx-6 p-2`}
            onPressIn={() => {
              // setButtonColor("bg-green-900");
              setDropDVis(!dropDVis);
              setIsSpotifySearched(false);
              setSearchText("");
            }}
            onPressOut={() => {
              // setButtonColor("bg-[#15BA46]");
            }}
          >
            <Ionicons
              name="search-outline"
              size={30}
              color="black"
              className="m-4"
            />
          </Pressable>
          <Image
            source={require("../../../assets/images/Wax-logo-transparent.png")}
            className="h-full w-[50%]"
            resizeMode="center"
          />
          <Pressable
            onPress={() => router.push(`/(public)/user/${user.username}`)}
            className={`items-center mx-6 p-2`}
          >
            <Ionicons
              name="person-outline"
              size={30}
              color="black"
              className="m-4"
            />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
      {dropDVis && (
        <SearchDropDown
          searchText={searchText}
          setSearchText={setSearchText}
          setSearchedUpMusic={setSearchedUpMusic}
          dropDVis={dropDVis}
          setDropDVis={setDropDVis}
          setIsSpotifySearched={setIsSpotifySearched}
          isSpotifySearched={isSpotifySearched}
        />
      )}
      {isSpotifySearched && (
        <SearchFilterBar
          searchText={searchText}
          setIsSpotifySearched={setIsSpotifySearched}
        />
      )}
      {isSpotifySearched && Array.isArray(searchedUpMusic) ? (
        <ScrollView>
          <View className="flex flex-row flex-wrap justify-betweenbg-pink-50 mb-20 mt-5">
            {searchedUpMusic.map((track) => (
              <Pressable
                key={track.music_id}
                onPress={() => router.push(`/(public)/music/${track.music_id}`)}
                className="w-1/2 h-auto"
              >
                <View
                  key={track.music_id}
                  className=" p-4 pink-50  rounded-lg items-center justify-center"
                >
                  <Image
                    source={{ uri: track.album_img }}
                    className="w-40 h-40   rounded-lg"
                  />
                  <Text className="text-center py-1 mt-2">
                    {track.artist_names}
                  </Text>
                  <Text className="text-center">{track.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View className="flex flex-row flex-wrap justify-between bg-white">
            {music.map((track) => (
              <Pressable
                key={track.music_id}
                onPress={() => router.push(`/(public)/music/${track.music_id}`)}
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
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Albums;
