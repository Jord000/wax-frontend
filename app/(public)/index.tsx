import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Auth from "../../components/Auth";

import "react-native-url-polyfill/auto";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFollows } from "../../utils/api";
import { UserContext } from "../../contexts/UserContent";

const Welcome = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    restoreSession();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const restoreSession = async () => {
    const { data } = await supabase.auth.getSession();
    const username = await AsyncStorage.getItem("username");

    if (data) {
      const { following } = await getFollows(username as string);
      setUser({ username, following });
      setSession(data.session);
      router.replace("/(public)/music");
    }
  };

  return (
    <SafeAreaView className="bg-[#B56DE4] h-full">
      <Auth session={session!} />
    </SafeAreaView>
  );
};

export default Welcome;
