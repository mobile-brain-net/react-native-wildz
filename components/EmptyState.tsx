import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  message: string;
};

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 24,
    opacity: 0.6,
  },
  title: {
    fontFamily: typography.header,
    fontSize: 20,
    color: colors.sunlitSand,
    marginBottom: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  message: {
    fontFamily: typography.bodyRegular,
    fontSize: 14,
    color: colors.skyMist,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.5,
  },
});
