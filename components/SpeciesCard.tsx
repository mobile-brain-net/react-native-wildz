import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Species } from '../lib/speciesData';

type SpeciesCardProps = {
  species: Species;
  bookmarked: boolean;
  onPress: () => void;
  onBookmark: () => void;
};

export function SpeciesCard({ species, bookmarked, onPress, onBookmark }: SpeciesCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {species.name}
          </Text>
          <Text style={styles.latin} numberOfLines={1}>
            {species.latinName}
          </Text>
        </View>
        <TouchableOpacity onPress={onBookmark} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Star
            size={20}
            color={bookmarked ? colors.sunlitSand : colors.skyMist}
            fill={bookmarked ? colors.sunlitSand : 'none'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tags}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{species.category}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{species.biome}</Text>
        </View>
      </View>
      <Text style={styles.status}>{species.status}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.duskMoss,
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.rustRed,
    shadowColor: colors.rustRed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontFamily: typography.header,
    fontSize: 16,
    color: colors.sunlitSand,
    marginBottom: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  latin: {
    fontFamily: typography.bodyRegular,
    fontSize: 12,
    color: colors.skyMist,
    letterSpacing: 0.5,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.inkForest,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.skyMist + '30',
  },
  tagText: {
    fontFamily: typography.metadata,
    fontSize: 10,
    color: colors.skyMist,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  status: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.emberOrange,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
