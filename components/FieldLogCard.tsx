import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Cloud } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { FieldLog } from '../lib/storage';

type FieldLogCardProps = {
  log: FieldLog;
  onPress?: () => void;
};

export function FieldLogCard({ log, onPress }: FieldLogCardProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.species}>{log.speciesName}</Text>
        <Text style={styles.time}>{log.time}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MapPin size={14} color={colors.skyMist} />
          <Text style={styles.detailText}>
            {log.biome}
            {log.locationNote ? ` • ${log.locationNote}` : ''}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Cloud size={14} color={colors.skyMist} />
          <Text style={styles.detailText}>{log.weather}</Text>
        </View>
      </View>
      {log.notes && <Text style={styles.notes}>{log.notes}</Text>}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.duskMoss,
    borderRadius: 4,
    padding: 16,
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
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.skyMist + '20',
  },
  species: {
    fontFamily: typography.header,
    fontSize: 16,
    color: colors.sunlitSand,
    flex: 1,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  time: {
    fontFamily: typography.metadata,
    fontSize: 11,
    color: colors.skyMist,
    letterSpacing: 0.5,
  },
  details: {
    gap: 8,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: typography.bodyRegular,
    fontSize: 13,
    color: colors.skyMist,
    letterSpacing: 0.3,
  },
  notes: {
    fontFamily: typography.bodyRegular,
    fontSize: 13,
    color: colors.skyMist,
    marginTop: 8,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
});
