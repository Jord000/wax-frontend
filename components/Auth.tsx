import React, { useContext, useState } from "react";
import { Alert, View, Keyboard, Image } from "react-native";
import { supabase } from "../lib/supabase";
import { Input } from "react-native-elements";
import { router } from "expo-router";
import { FormButton } from "./reusable-components/FormButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { UserContext } from "../app/contexts/UserContent";
import { Session } from "@supabase/supabase-js";

export default function Auth({ session }: { session: Session }) {
//   const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      console.log(session.user);
      router.replace("/(public)/music");
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
    Alert.alert("Please check your inbox for email verification!");
    
        // sends username to database
    setLoading(false);
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="w-full h-1/4 justify-center items-center mt-14 mb-8">
          <Image
            source={require("../assets/images/icon.png")}
            resizeMode="center"
          />
        </View>
        <View className="mx-[2%]">
          <Input
            label="Email"
            labelStyle={{ color: "black" }}
            inputContainerStyle={{ borderColor: "black" }}
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            placeholderTextColor={"black"}
            autoCapitalize={"none"}
          />
        </View>
        <View className="mx-[2%]">
          <Input
            inputContainerStyle={{ borderColor: "black" }}
            label="Password"
            labelStyle={{ color: "black" }}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor={"black"}
            autoCapitalize={"none"}
          />
        </View>
      </TouchableWithoutFeedback>
      <View className="m-auto mt-4">
        <FormButton
          text="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View className="m-auto mt-4">
        <FormButton
          text="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
}
