import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Auth from "../../components/Auth";

import "react-native-url-polyfill/auto";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

const Welcome = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView className="bg-[#B56DE4] h-full">
      <Auth session={session!} />
    </SafeAreaView>
  );
};

export default Welcome;
