import { Tabs } from "expo-router";
import React from "react";
import TabBar from '../../components/tabBar';
import { useAuth } from "@/src/context/AuthContext";

export default function TabLayout() {
  const { usuario } = useAuth();
  
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Protected guard={!!usuario}>
        <Tabs.Screen
          name="index"
          options={{ title: "Home"}}
        />
        <Tabs.Screen name="search" options={{ title: "Search" }} />
        <Tabs.Screen name="profile" options={{title: "Profile"}} />
      </Tabs.Protected>
    </Tabs>
  );
}