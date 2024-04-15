import { Pressable, Text, View, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import {
  getFollows,
  getReviewsByUsername,
  patchFollows,
} from "../../../../utils/api";
import UserItem from "../../../../components/UserItem";
import { UserContext } from "../../../../contexts/UserContent";
import ReviewHistory from "../../../../components/ReviewHistory";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { username } = useGlobalSearchParams();
  const [connections, setConnections] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    !username && router.push(`/(auth)/`);

    (async () => {
      const userReviews = await getReviewsByUsername(username as string);
      setActivity(userReviews);
    })();
  }, []);

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
        {username}'s activity:
      </Text>

      <ReviewHistory activity={activity} />

      {user.following.includes(username as string) ? (
        <Pressable onPress={handleUnfollow}>
          <Text className="p-4 font-bold text-lg">{username} is Following</Text>
        </Pressable>
      ) : (
        <Pressable onPress={handleFollow}>
          <Text className="p-4 font-bold text-lg">Follow</Text>
        </Pressable>
      )}
      <ScrollView className="px-4 mb-4 h-[33vh] mx-4 bg-white rounded-lg">
        {connections.map((user) => (
          <UserItem key={user} username={user} textModifier="text-lg" />
        ))}
      </ScrollView>
    </View>
  );
};

export default UserPage;
