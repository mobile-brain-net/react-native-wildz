import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Footprints, Trees, AlertTriangle, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { ToolCard } from '../../components/ToolCard';
import { TagChip } from '../../components/TagChip';
import {
  identifyTrack,
  TrackInput,
  TrackResult,
} from '../../lib/trackLab';
import {
  identifyHabitat,
  HabitatInput,
  HabitatTrait,
  HabitatResult,
} from '../../lib/habitatLab';

type Tool = 'track' | 'habitat' | 'stress' | null;

export default function LabScreen() {
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [trackInput, setTrackInput] = useState<TrackInput>({
    shape: 'paw',
    size: 'medium',
    toes: '4',
  });
  const [trackResults, setTrackResults] = useState<TrackResult[]>([]);
  const [habitatInput, setHabitatInput] = useState<HabitatInput>({ traits: [] });
  const [habitatResults, setHabitatResults] = useState<HabitatResult[]>([]);
  const [stressIndicators, setStressIndicators] = useState<string[]>([]);

  function runTrackLab() {
    const results = identifyTrack(trackInput);
    setTrackResults(results);
  }

  function runHabitatLab() {
    const results = identifyHabitat(habitatInput);
    setHabitatResults(results);
  }

  function toggleHabitatTrait(trait: HabitatTrait) {
    const traits = habitatInput.traits.includes(trait)
      ? habitatInput.traits.filter((t) => t !== trait)
      : [...habitatInput.traits, trait];
    setHabitatInput({ traits });
  }

  function toggleStressIndicator(indicator: string) {
    setStressIndicators((prev) =>
      prev.includes(indicator) ? prev.filter((i) => i !== indicator) : [...prev, indicator]
    );
  }

  function getStressAssessment() {
    const count = stressIndicators.length;
    if (count === 0) return { level: 'Healthy', color: colors.leafGreen, message: 'No stress indicators detected' };
    if (count <= 2) return { level: 'Low Stress', color: colors.sunlitSand, message: 'Minor concerns, monitor situation' };
    if (count <= 4) return { level: 'Moderate Stress', color: colors.emberOrange, message: 'Multiple stressors present, intervention recommended' };
    return { level: 'High Stress', color: colors.rustRed, message: 'Critical conditions, immediate action needed' };
  }

  function closeTool() {
    setActiveTool(null);
    setTrackResults([]);
    setHabitatResults([]);
    setStressIndicators([]);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Field Lab</Text>
          <Text style={styles.subtitle}>Identification Tools</Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
        <ToolCard
          icon={<Footprints size={28} color={colors.sunlitSand} />}
          title="Track Lab"
          description="Identify species from track characteristics"
          onPress={() => setActiveTool('track')}
        />
        <ToolCard
          icon={<Trees size={28} color={colors.leafGreen} />}
          title="Habitat Lab"
          description="Determine biome type from environmental features"
          onPress={() => setActiveTool('habitat')}
        />
        <ToolCard
          icon={<AlertTriangle size={28} color={colors.emberOrange} />}
          title="Stress Scan"
          description="Assess ecosystem health from stress indicators"
          onPress={() => setActiveTool('stress')}
        />
      </ScrollView>
      </SafeAreaView>

      <Modal
        visible={activeTool === 'track'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Track Lab</Text>
            <TouchableOpacity onPress={closeTool}>
              <X size={24} color={colors.skyMist} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Track Shape</Text>
            <View style={styles.optionRow}>
              {['cloven', 'paw', 'bird', 'hand'].map((shape) => (
                <TagChip
                  key={shape}
                  label={shape}
                  selected={trackInput.shape === shape}
                  onPress={() => setTrackInput({ ...trackInput, shape: shape as any })}
                />
              ))}
            </View>

            <Text style={styles.label}>Size</Text>
            <View style={styles.optionRow}>
              {['tiny', 'small', 'medium', 'large', 'huge'].map((size) => (
                <TagChip
                  key={size}
                  label={size}
                  selected={trackInput.size === size}
                  onPress={() => setTrackInput({ ...trackInput, size: size as any })}
                />
              ))}
            </View>

            <Text style={styles.label}>Toe Count</Text>
            <View style={styles.optionRow}>
              {['2', '3', '4', '5', 'more'].map((toes) => (
                <TagChip
                  key={toes}
                  label={toes}
                  selected={trackInput.toes === toes}
                  onPress={() => setTrackInput({ ...trackInput, toes: toes as any })}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.analyzeButton} onPress={runTrackLab}>
              <Text style={styles.analyzeButtonText}>Identify</Text>
            </TouchableOpacity>

            {trackResults.length > 0 && (
              <View style={styles.resultsSection}>
                <Text style={styles.resultsTitle}>Possible Species</Text>
                {trackResults.map((result, idx) => (
                  <View key={idx} style={styles.resultCard}>
                    <Text style={styles.resultSpecies}>{result.species}</Text>
                    <Text style={styles.resultConfidence}>
                      {result.confidence.toUpperCase()} confidence
                    </Text>
                    <Text style={styles.resultNotes}>{result.notes}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={activeTool === 'habitat'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Habitat Lab</Text>
            <TouchableOpacity onPress={closeTool}>
              <X size={24} color={colors.skyMist} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Environmental Features</Text>
            <View style={styles.optionRow}>
              {[
                'dense-canopy',
                'open-sky',
                'standing-water',
                'flowing-water',
                'sandy-soil',
                'rocky-terrain',
                'tall-grass',
                'short-grass',
                'salt-presence',
                'elevation',
              ].map((trait) => (
                <TagChip
                  key={trait}
                  label={trait.replace('-', ' ')}
                  selected={habitatInput.traits.includes(trait as HabitatTrait)}
                  onPress={() => toggleHabitatTrait(trait as HabitatTrait)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.analyzeButton} onPress={runHabitatLab}>
              <Text style={styles.analyzeButtonText}>Analyze</Text>
            </TouchableOpacity>

            {habitatResults.length > 0 && (
              <View style={styles.resultsSection}>
                <Text style={styles.resultsTitle}>Likely Biomes</Text>
                {habitatResults.map((result, idx) => (
                  <View key={idx} style={styles.resultCard}>
                    <Text style={styles.resultSpecies}>{result.biome}</Text>
                    <Text style={styles.resultConfidence}>
                      {result.confidence.toUpperCase()} confidence
                    </Text>
                    <Text style={styles.resultNotes}>
                      Example species: {result.species.join(', ')}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={activeTool === 'stress'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Stress Scan</Text>
            <TouchableOpacity onPress={closeTool}>
              <X size={24} color={colors.skyMist} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Stress Indicators</Text>
            <View style={styles.optionRow}>
              {[
                'Heavy litter',
                'Erosion',
                'Invasive species',
                'Water pollution',
                'Dead vegetation',
                'Construction nearby',
                'Chemical odor',
                'Sparse wildlife',
              ].map((indicator) => (
                <TagChip
                  key={indicator}
                  label={indicator}
                  selected={stressIndicators.includes(indicator)}
                  onPress={() => toggleStressIndicator(indicator)}
                />
              ))}
            </View>

            {stressIndicators.length > 0 && (
              <View style={styles.resultsSection}>
                <Text style={styles.resultsTitle}>Assessment</Text>
                <View style={[styles.assessmentCard, { borderColor: getStressAssessment().color }]}>
                  <Text style={[styles.assessmentLevel, { color: getStressAssessment().color }]}>
                    {getStressAssessment().level}
                  </Text>
                  <Text style={styles.assessmentMessage}>{getStressAssessment().message}</Text>
                  <Text style={styles.indicatorCount}>
                    {stressIndicators.length} indicator{stressIndicators.length > 1 ? 's' : ''} detected
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
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
    marginBottom: 6,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: colors.sunlitSand,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontFamily: typography.bodyRegular,
    fontSize: 14,
    color: colors.skyMist,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
    borderBottomWidth: 3,
    borderBottomColor: colors.emberOrange,
  },
  modalTitle: {
    fontFamily: typography.header,
    fontSize: 22,
    color: colors.sunlitSand,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.sunlitSand,
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 16,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  analyzeButton: {
    backgroundColor: colors.sunlitSand,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  analyzeButtonText: {
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.inkForest,
  },
  resultsSection: {
    marginTop: 32,
  },
  resultsTitle: {
    fontFamily: typography.header,
    fontSize: 20,
    color: colors.sunlitSand,
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: colors.duskMoss,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.skyMist + '20',
  },
  resultSpecies: {
    fontFamily: typography.header,
    fontSize: 18,
    color: colors.sunlitSand,
    marginBottom: 4,
  },
  resultConfidence: {
    fontFamily: typography.metadata,
    fontSize: 12,
    color: colors.emberOrange,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  resultNotes: {
    fontFamily: typography.bodyRegular,
    fontSize: 14,
    color: colors.skyMist,
    lineHeight: 20,
  },
  assessmentCard: {
    backgroundColor: colors.duskMoss,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
  },
  assessmentLevel: {
    fontFamily: typography.header,
    fontSize: 24,
    marginBottom: 8,
  },
  assessmentMessage: {
    fontFamily: typography.bodyRegular,
    fontSize: 15,
    color: colors.skyMist,
    lineHeight: 22,
    marginBottom: 12,
  },
  indicatorCount: {
    fontFamily: typography.metadata,
    fontSize: 13,
    color: colors.skyMist + 'CC',
  },
});
