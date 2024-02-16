import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="[username]/index"
        options={{ headerShown: true, title: "Back to Feed" }}
      />
    </Stack>
  );
};
