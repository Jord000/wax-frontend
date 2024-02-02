import React from "react";
import { Image, Keyboard, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormFieldText } from "../../components/reusable-components/FormFieldText";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Auth from "../../components/Auth";

import "react-native-url-polyfill/auto";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

const Welcome = () => {
  //!
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  //!
  return (
    //     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
    //     </TouchableWithoutFeedback>
    //     <View className="m-auto mt-4">
    //       <ClicketyBoo
    //         onPressFunction={() => router.replace("/(public)/music")}
    //         text="log in"
    //       />
    //     </View>

    // );
    <SafeAreaView className="bg-[#B56DE4] h-full">
      <Auth />
    </SafeAreaView>
  );
};

export default Welcome;
