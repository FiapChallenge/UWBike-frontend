import { View, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";


export default function TabBar({state,descriptors,navigation,}: BottomTabBarProps) {
  const icons: Record<string, keyof typeof Feather.glyphMap> = {
    index: "home",
    search: "search",
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

      const iconName = icons[route.name];
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
           <Feather
              name={iconName}
              color={isFocused ? "#00B030" : "#929292"}
              size={24}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    width: "auto",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});