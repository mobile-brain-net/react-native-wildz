import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Species } from '../lib/speciesData';

type SpeciesDetailSheetProps = {
  species: Species | null;
  visible: boolean;
  onClose: () => void;
};

export function SpeciesDetailSheet({ species, visible, onClose }: SpeciesDetailSheetProps) {
  if (!species) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.name}>{species.name}</Text>
            <Text style={styles.latin}>{species.latinName}</Text>
          </View>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <X size={24} color={colors.skyMist} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.metaRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{species.category}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{species.biome}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{species.region}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conservation Status</Text>
            <Text style={styles.statusBadge}>{species.status}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Field Signs</Text>
            {species.signs.map((sign, index) => (
              <Text key={index} style={styles.bulletItem}>
                • {sign}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Behavior</Text>
            <Text style={styles.bodyText}>{species.behavior}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ecological Importance</Text>
            <Text style={styles.bodyText}>{species.importance}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.inkForest,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.duskMoss,
    borderBottomWidth: 3,
    borderBottomColor: colors.emberOrange,
  },
  headerText: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontFamily: typography.header,
    fontSize: 24,
    color: colors.sunlitSand,
    marginBottom: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  latin: {
    fontFamily: typography.bodyRegular,
    fontSize: 14,
    color: colors.skyMist,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: colors.duskMoss,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.skyMist + '40',
  },
  tagText: {
    fontFamily: typography.metadata,
    fontSize: 11,
    color: colors.skyMist,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.skyMist + '20',
  },
  sectionTitle: {
    fontFamily: typography.header,
    fontSize: 16,
    color: colors.sunlitSand,
    marginBottom: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  statusBadge: {
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.emberOrange,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bulletItem: {
    fontFamily: typography.bodyRegular,
    fontSize: 14,
    color: colors.skyMist,
    lineHeight: 24,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  bodyText: {
    fontFamily: typography.bodyRegular,
    fontSize: 14,
    color: colors.skyMist,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});
