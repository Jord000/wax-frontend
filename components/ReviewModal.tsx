import { useState } from "react";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";

const ReviewModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);

  const handleTitle = (input: string) => {
    setTitle(input);
  };
  const handleBody = (input: string) => {
    setBody(input);
  };
  const handleRate = (input: number) => {
    setRating(input);
  };
  const handleSubmit = () => {
    // TODO add util function to post user
  };
  const reviewScores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="w-[90%] mx-[5%] h-[60%] bg-slate-300 absolute inset-x-0 bottom-0 rounded-t-xl p-2 shadow-2xl">
          <View>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text className="text-right">❌</Text>
            </Pressable>
            <View className="flex-row p-4 justify-center">
              {reviewScores.map((num) => (
                <Pressable
                  key={num}
                  onPress={() => handleRate(num)}
                  className="mx-1 p-2 bg-orange-500 rounded-full "
                >
                  <Text className="w-3 text-center">{num}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              className="bg-white p-2 m-3 h-10 rounded-md"
              placeholder="title"
              placeholderTextColor={"#0008"}
              value={title}
              onChangeText={handleTitle}
            />
            <TextInput
              className="bg-white p-2 m-3 rounded-md min-h-full"
              placeholder="body"
              placeholderTextColor={"#0008"}
              value={body}
              onChangeText={handleBody}
              multiline={true}
            />
            <Pressable
              onPress={handleSubmit}
              className="bg-red-200 w-40 p-6 rounded-md mx-auto"
            >
              <Text className="text-center">submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        className="bg-red-200 w-40 p-6 rounded-md mx-auto"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center">Show Modal</Text>
      </Pressable>
    </View>
  );
};
export default ReviewModal;
