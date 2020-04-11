import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@theme";

export default function Start({ onClick }: any) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.header}>
        React Native
      </Text>

      <Text style={styles.link} accessibilityRole="link" onPress={onClick}>
        A universal link
      </Text>

      <View style={styles.textContainer}>
        <Text accessibilityRole="header" aria-level="2" style={styles.text}>
          Subheader
        </Text>
      </View>
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
      backgroundColor: theme.palette.primary[1],
    },
    link: {
      color: theme.palette.secondary.base,
    },
    textContainer: {
      alignItems: "center",
      marginTop: theme.spacing.md,
    },
    header: {
      alignItems: "center",
      fontSize: theme.heading[1].fontSize,
      color: theme.palette.primary.base,
      marginBottom: theme.spacing.xl,
    },
    text: {
      alignItems: "center",
      fontSize: theme.font.base.fontSize,
      color: theme.palette.grey.base,
      marginBottom: theme.spacing.md,
    },
  });
}
