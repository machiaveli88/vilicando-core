import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@theme";

export default function Alternate({ onClick }: any) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.text}>
        Alternate Page
      </Text>

      <Text style={styles.link} accessibilityRole="link" onPress={onClick}>
        Go Back
      </Text>
    </View>
  );
}

function useStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      alignItems: "center",
      flexGrow: 1,
      justifyContent: "center",
    },
    text: {
      alignItems: "center",
      fontSize: theme.font.base.fontSize,
      marginBottom: theme.spacing.md,
    },
    link: {
      color: theme.secondary.base,
    },
  });
}
