import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { BiomeHealthDial } from './BiomeHealthDial';
import { getHealthLabel } from '../lib/biomeScore';

type BiomeCardProps = {
  biomeName: string;
  biomeType: string;
  score: number;
  lastChecked: string;
  onPress: () => void;
};

export function BiomeCard({ biomeName, biomeType, score, lastChecked, onPress }: BiomeCardProps) {
  const healthLabel = getHealthLabel(score);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.name}>{biomeName}</Text>
          <Text style={styles.type}>{biomeType}</Text>
          <Text style={styles.status}>{healthLabel}</Text>
        </View>
        <BiomeHealthDial score={score} size="small" />
      </View>
      <Text style={styles.date}>Last checked: {lastChecked}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.duskMoss,
    borderRadius: 4,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.skyMist + '40',
    shadowColor: colors.skyMist,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  info: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontFamily: typography.header,
    fontSize: 18,
    color: colors.sunlitSand,
    marginBottom: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  type: {
    fontFamily: typography.bodyRegular,
    fontSize: 13,
    color: colors.skyMist,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  status: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.emberOrange,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  date: {
    fontFamily: typography.metadata,
    fontSize: 11,
    color: colors.skyMist + 'CC',
    letterSpacing: 0.5,
  },
});
