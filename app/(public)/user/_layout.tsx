import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="user"
        options={{ headerShown: true, title: "User" }}
      />
    </Stack>
  );
};
