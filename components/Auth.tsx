import React, { useState } from "react";
import { Alert, StyleSheet, View,Keyboard } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";
import { router } from "expo-router";
import { FormButton } from "./reusable-components/FormButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Auth() {
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
    setLoading(false);
  }

  return (
    <View >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View >
          <Input
            label="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View >
          <Input
            label="Password"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
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

//
//       <View className="w-full h-1/4 justify-center items-center mt-14">
//         <Image
//           source={require("../../assets/images/icon.png")}
//           resizeMode="center"
//         />
//       </View>
//       <View className="mt-16 p-2">
//         <FormFieldText
//           label="Username"
//           setText={setUsername}
//           isRequired={true}
//           autoComplete="username"
//           enterKeyHint="next"
//           onSubmitFunction={() => {}}
//         />

//         <FormFieldText
//           label="Password"
//           setText={setPassword}
//           isRequired={true}
//           autoComplete="current-password"
//           enterKeyHint="go"
//           onSubmitFunction={() => router.replace("/(public)/music")}
//         />
//       </View>
//

// );
