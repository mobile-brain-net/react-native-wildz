import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type TagChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function TagChip({ label, selected = false, onPress }: TagChipProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 2,
    backgroundColor: colors.duskMoss,
    borderWidth: 2,
    borderColor: colors.skyMist + '40',
  },
  chipSelected: {
    backgroundColor: colors.emberOrange + '30',
    borderColor: colors.emberOrange,
    shadowColor: colors.emberOrange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.skyMist,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  labelSelected: {
    color: colors.sunlitSand,
  },
});
