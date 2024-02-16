import { useEffect, useState, useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { deleteReview, getReviews } from "../utils/api";
import { useGlobalSearchParams } from "expo-router";
import { Review } from "../types/front-end";
import ReviewModal from "./ReviewModal";
import { UserContext } from "../contexts/UserContent";
import { Ionicons } from "@expo/vector-icons";
import UserItem from "./UserItem";

export const Reviews = () => {
  const { music_id } = useGlobalSearchParams();
  const [reviews, setReviews] = useState<Review[]>();
  const [deleted, setDeleted] = useState<number>(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const doThis = async () => {
      const reviewData = await getReviews(music_id as string);
      setReviews(reviewData);
    };
    doThis();
  }, []);

  const handleDelete = async (review_id: number) => {
    setDeleted(review_id);
    const deleted_Review = await deleteReview(review_id);
  };

  return (
    <>
      <ReviewModal setReviews={setReviews} />
      <View className="bg-[#faf6ff]">
        <Text className="mt-10 text-center font-bold text-lg">REVIEWS</Text>
        {reviews
          ?.filter((review: Review) => review.review_id !== deleted)
          .map((review: Review) => {
            return (
              <View key={Math.random()} className="my-2 mx-3 bg-slate-50 p-2">
                <View className="flex-row">
                <UserItem username={review.username} />
                  <Text className="py-1 font-semibold align-middle">
                    : Rating: {review.rating}
                  </Text>
                </View>
                {user.username === review.username ? (
                  <Pressable
                    onPress={() => handleDelete(review.review_id as number)}
                    className="ml-[92%] justify-items-end"
                  >
                    <Ionicons name="trash-outline" size={25} color="black" />
                  </Pressable>
                ) : (
                  ""
                )}
                <Text className="italic py-1">{review.review_title}</Text>
                <Text className="mb-2">{review.review_body}</Text>
                <Text className="text-xs">
                  Posted On: {review.created_at?.substring(0, 10)}
                </Text>
              </View>
            );
          })}
      </View>
    </>
  );
};
