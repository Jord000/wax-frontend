import { useContext } from "react";
import { Text, View } from "react-native";
import UserItem from "../../../components/UserItem";
import { UserContext } from "../../../contexts/UserContent";


const CurrentUser = () => {
  const { user } = useContext(UserContext);



  return (
    <View>
      <Text>Username: {user.username}</Text>

      {user.following.map((user) => (
        <UserItem key={user} username={user} />
      ))}
    </View>
  );
};

export default CurrentUser;
