import { useContext } from "react";
import { Text, View } from "react-native";
import UserItem from "../../../components/UserItem";
import { UserContext } from "../../../contexts/UserContent";


const CurrentUser = () => {
  const { user } = useContext(UserContext);
  const textModifier = 'text-lg'


  return (
    <View>
      <Text className="p-4 font-bold text-lg">Hello {user.username} !</Text>
      <Text className="p-4">You are folowing :</Text>
      {user.following.map((user) => (
        <View key={user} className="px-4">
        <UserItem  username={user} textModifier={textModifier}/>
        </View>
      ))}
    </View>
  );
};

export default CurrentUser;
