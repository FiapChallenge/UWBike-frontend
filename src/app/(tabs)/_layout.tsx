import { Redirect, Tabs } from "expo-router";
import React from "react";
import TabBar from '../../components/tabBar';
import { PatioProvider } from "@/src/context/PatioContext";
import { useAuth } from "@/src/context/AuthContext";

export default function TabLayout() {  
  const { usuario } = useAuth();

  if (!usuario) {
    return <Redirect href="/(auth)" />; 
  }
  return (
    <PatioProvider>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} />}
      >
            <Tabs.Screen
              name="index"
              options={{ title: "Home"}}
            />
            <Tabs.Screen name="search" options={{ title: "Search" }} />
            <Tabs.Screen name="profile" options={{title: "Profile"}} />

      </Tabs>
    </PatioProvider>
  );
}