import { Tabs } from 'expo-router';
import { BookOpen, NotebookPen, TreeDeciduous, Sparkles, FlaskConical } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.sunlitSand,
        tabBarInactiveTintColor: colors.skyMist + '60',
        tabBarStyle: {
          backgroundColor: colors.inkForest,
          borderTopColor: colors.emberOrange,
          borderTopWidth: 3,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: colors.emberOrange,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.6,
          shadowRadius: 12,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 1,
          textTransform: 'uppercase',
          textShadowColor: colors.sunlitSand,
          textShadowRadius: 6,
        },
      }}
    >
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Guide',
          tabBarIcon: ({ size, color }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ size, color }) => <NotebookPen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="biomes"
        options={{
          title: 'Biomes',
          tabBarIcon: ({ size, color }) => <TreeDeciduous size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="impact"
        options={{
          title: 'Impact',
          tabBarIcon: ({ size, color }) => <Sparkles size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lab"
        options={{
          title: 'Lab',
          tabBarIcon: ({ size, color }) => <FlaskConical size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
