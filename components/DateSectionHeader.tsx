import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type DateSectionHeaderProps = {
  label: string;
};

export function DateSectionHeader({ label }: DateSectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.inkForest,
    borderLeftWidth: 4,
    borderLeftColor: colors.emberOrange,
  },
  label: {
    fontFamily: typography.metadata,
    fontSize: 11,
    color: colors.skyMist,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
