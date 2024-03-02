import React, { useContext, useState } from "react";
import { Alert, View, Keyboard, Image } from "react-native";
import { supabase } from "../lib/supabase";
import { Input } from "react-native-elements";
import { router } from "expo-router";
import { FormButton } from "./reusable-components/FormButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { UserContext } from "../contexts/UserContent";
import { Session } from "@supabase/supabase-js";
import { getFollows } from "../utils/api";

export default function Auth({ session }: { session: Session | null }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSingingUp] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      const username = data.user.user_metadata.username;
      const { following } = await getFollows(username as string);
      setUser({ username, following });
      router.replace("/(public)/music");
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data } = await supabase
      .from("users")
      .select("username")
      .eq("username", userName);

    if (data?.length) {
      setLoading(false);
      Alert.alert("username already exists");
      return undefined;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { username: userName } },
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
    if (!session && !error) {
      Alert.alert("Please check your inbox for email verification!");
      setLoading(false);
    }

    if (!error) {
      await supabase.from("users").insert({ username: userName });
      setIsSingingUp(false);
      setLoading(false);
    }
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
        {isSigningUp && (
          <View className="mx-[2%]">
            <Input
              label="username"
              labelStyle={{ color: "black" }}
              inputContainerStyle={{ borderColor: "black" }}
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={(text) => setUserName(text)}
              value={userName}
              placeholder="myName123"
              placeholderTextColor={"black"}
              autoCapitalize={"none"}
            />
          </View>
        )}
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
      {!isSigningUp && (
        <View className="m-auto mt-4">
          <FormButton
            text="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
      )}

      {!isSigningUp && (
        <View className="m-auto mt-4">
          <FormButton
            text="I'd like to sign up!!"
            disabled={loading}
            onPress={() => setIsSingingUp(!isSigningUp)}
          />
        </View>
      )}

      {isSigningUp && (
        <View className="m-auto mt-4">
          <FormButton
            text="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
      )}
      {isSigningUp && (
        <View className="m-auto mt-4">
          <FormButton
            text="Go Back"
            disabled={loading}
            onPress={() => setIsSingingUp(false)}
          />
        </View>
      )}
    </View>
  );
}
