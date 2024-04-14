import { router } from "expo-router";
import { Pressable, View, Image, Text, ScrollView } from "react-native";

const ReviewHistory = ({ activity }: { activity: any }) => {
  console.log(activity);
  return (
    <ScrollView className="max-h-[35vh] mx-4 bg-white rounded-lg">
      {activity.map(
        (trackReview: {
          music_id: string;
          review_id: string;
          review_body: string;
          album_img: string;
          artist_names: string[];
          name: string;
          created_at: string;
        }) => (
          <Pressable
            key={trackReview.music_id}
            onPress={() => router.push(`/(auth)/music/${trackReview.music_id}`)}
            className="mx-auto w-[90vw]"
          >
            <View
              key={trackReview.review_id}
              className="h-max p-4 flex flex-row justify-between"
            >
              <Image
                source={{ uri: trackReview.album_img }}
                className="h-28 w-28  rounded-md"
              />
              <View className="w-[60%]">
                <Text className="text-sm font-bold text-center">
                  {trackReview.name}
                </Text>
                <Text className="text-xs font-bold text-center m-1">
                  {trackReview.artist_names[0]}
                </Text>
                <Text className="text-md text-center my-1">
                  {trackReview.review_body}
                </Text>
                <Text className="text-xs text-slate-500 text-center">
                  Posted On: {trackReview.created_at?.substring(0, 10)}
                </Text>
              </View>
            </View>
          </Pressable>
        )
      )}
    </ScrollView>
  );
};

export default ReviewHistory;
