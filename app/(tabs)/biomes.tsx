import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { storage, HabitatCheck } from '../../lib/storage';
import { biomeTypes } from '../../lib/speciesData';
import { calculateBiomeScore } from '../../lib/biomeScore';
import { BiomeCard } from '../../components/BiomeCard';
import { TagChip } from '../../components/TagChip';
import { EmptyState } from '../../components/EmptyState';

type BiomeGroup = {
  biomeName: string;
  biomeType: string;
  latestCheck: HabitatCheck;
  allChecks: HabitatCheck[];
};

export default function BiomesScreen() {
  const [checks, setChecks] = useState<HabitatCheck[]>([]);
  const [editorVisible, setEditorVisible] = useState(false);
  const [newCheck, setNewCheck] = useState<Partial<HabitatCheck>>({
    biomeName: '',
    biomeType: biomeTypes[0],
    vegetation: 'mixed',
    water: 'limited',
    disturbance: 'low',
    litter: 'low',
  });

  useEffect(() => {
    loadChecks();
  }, []);

  async function loadChecks() {
    const saved = await storage.getBiomes();
    setChecks(saved.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  async function saveCheck() {
    Keyboard.dismiss();
    if (!newCheck.biomeName) return;

    const score = calculateBiomeScore({
      id: '',
      biomeName: newCheck.biomeName || '',
      biomeType: newCheck.biomeType || biomeTypes[0],
      date: new Date().toISOString().split('T')[0],
      vegetation: newCheck.vegetation || 'mixed',
      water: newCheck.water || 'limited',
      disturbance: newCheck.disturbance || 'low',
      litter: newCheck.litter || 'low',
      notes: newCheck.notes,
    });

    const check: HabitatCheck = {
      id: Date.now().toString(),
      biomeName: newCheck.biomeName || '',
      biomeType: newCheck.biomeType || biomeTypes[0],
      date: new Date().toISOString().split('T')[0],
      vegetation: newCheck.vegetation || 'mixed',
      water: newCheck.water || 'limited',
      disturbance: newCheck.disturbance || 'low',
      litter: newCheck.litter || 'low',
      notes: newCheck.notes,
      score,
    };

    const updated = [check, ...checks];
    setChecks(updated);
    await storage.setBiomes(updated);
    setEditorVisible(false);
    resetForm();
  }

  function resetForm() {
    setNewCheck({
      biomeName: '',
      biomeType: biomeTypes[0],
      vegetation: 'mixed',
      water: 'limited',
      disturbance: 'low',
      litter: 'low',
      notes: '',
    });
  }

  const biomeGroups = checks.reduce((acc, check) => {
    const existing = acc.find((g) => g.biomeName === check.biomeName);
    if (existing) {
      existing.allChecks.push(check);
    } else {
      acc.push({
        biomeName: check.biomeName,
        biomeType: check.biomeType,
        latestCheck: check,
        allChecks: [check],
      });
    }
    return acc;
  }, [] as BiomeGroup[]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Habitat Monitor</Text>
        </View>

        {biomeGroups.length === 0 ? (
          <EmptyState
            icon={<Plus size={48} color={colors.skyMist} />}
            title="No Habitats Tracked"
            message="Start monitoring habitat health to track ecosystem changes over time"
          />
        ) : (
          <FlatList
            data={biomeGroups}
            keyExtractor={(item) => item.biomeName}
            renderItem={({ item }) => (
              <BiomeCard
                biomeName={item.biomeName}
                biomeType={item.biomeType}
                score={item.latestCheck.score}
                lastChecked={new Date(item.latestCheck.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                onPress={() => {}}
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setEditorVisible(true)}
          activeOpacity={0.8}
        >
          <Plus size={24} color={colors.inkForest} />
        </TouchableOpacity>
      </SafeAreaView>

      <Modal visible={editorVisible} animationType="slide" presentationStyle="pageSheet">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Habitat Check</Text>
              <TouchableOpacity onPress={() => { Keyboard.dismiss(); setEditorVisible(false); }}>
                <X size={24} color={colors.skyMist} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
            <Text style={styles.label}>Habitat Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., North Ridge Forest"
              placeholderTextColor={colors.skyMist + '60'}
              value={newCheck.biomeName}
              onChangeText={(text) => setNewCheck({ ...newCheck, biomeName: text })}
              returnKeyType="next"
              blurOnSubmit={false}
            />

            <Text style={styles.label}>Biome Type</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipRow}
              contentContainerStyle={styles.chipRowContent}
            >
              {biomeTypes.map((biome) => (
                <TagChip
                  key={biome}
                  label={biome}
                  selected={newCheck.biomeType === biome}
                  onPress={() => setNewCheck({ ...newCheck, biomeType: biome })}
                />
              ))}
            </ScrollView>

            <Text style={styles.label}>Vegetation</Text>
            <View style={styles.optionRow}>
              {['lush', 'mixed', 'thin', 'bare'].map((opt) => (
                <TagChip
                  key={opt}
                  label={opt}
                  selected={newCheck.vegetation === opt}
                  onPress={() => setNewCheck({ ...newCheck, vegetation: opt as any })}
                />
              ))}
            </View>

            <Text style={styles.label}>Water Availability</Text>
            <View style={styles.optionRow}>
              {['abundant', 'limited', 'dry'].map((opt) => (
                <TagChip
                  key={opt}
                  label={opt}
                  selected={newCheck.water === opt}
                  onPress={() => setNewCheck({ ...newCheck, water: opt as any })}
                />
              ))}
            </View>

            <Text style={styles.label}>Disturbance Level</Text>
            <View style={styles.optionRow}>
              {['low', 'medium', 'high'].map((opt) => (
                <TagChip
                  key={opt}
                  label={opt}
                  selected={newCheck.disturbance === opt}
                  onPress={() => setNewCheck({ ...newCheck, disturbance: opt as any })}
                />
              ))}
            </View>

            <Text style={styles.label}>Litter/Pollution</Text>
            <View style={styles.optionRow}>
              {['none', 'low', 'medium', 'high'].map((opt) => (
                <TagChip
                  key={opt}
                  label={opt}
                  selected={newCheck.litter === opt}
                  onPress={() => setNewCheck({ ...newCheck, litter: opt as any })}
                />
              ))}
            </View>

            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Additional observations..."
              placeholderTextColor={colors.skyMist + '60'}
              value={newCheck.notes}
              onChangeText={(text) => setNewCheck({ ...newCheck, notes: text })}
              multiline
              numberOfLines={4}
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />

            <TouchableOpacity
              style={[styles.saveButton, !newCheck.biomeName && styles.saveButtonDisabled]}
              onPress={saveCheck}
              disabled={!newCheck.biomeName}
            >
              <Text style={styles.saveButtonText}>Save Check</Text>
            </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.inkForest,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontFamily: typography.header,
    fontSize: 28,
    color: colors.sunlitSand,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: colors.sunlitSand,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.sunlitSand,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.sunlitSand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 2,
    borderColor: colors.skyMist,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.inkForest,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.duskMoss,
  },
  modalTitle: {
    fontFamily: typography.header,
    fontSize: 24,
    color: colors.sunlitSand,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.sunlitSand,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.duskMoss,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: typography.bodyRegular,
    fontSize: 16,
    color: colors.skyMist,
    borderWidth: 1,
    borderColor: colors.skyMist + '20',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  chipRow: {
    maxHeight: 50,
  },
  chipRowContent: {
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  saveButton: {
    backgroundColor: colors.sunlitSand,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
  saveButtonDisabled: {
    backgroundColor: colors.skyMist + '40',
  },
  saveButtonText: {
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.inkForest,
  },
});
