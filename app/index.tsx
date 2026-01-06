import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, Pressable, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
          Lock PDF + URL Agent
        </Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 48, textAlign: 'center' }}>
          v1.0 - Production-grade AI assistant
        </Text>

        <View style={{ gap: 16, width: '100%', maxWidth: 300 }}>
          <Pressable
            onPress={() => router.push('/test')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#2563eb' : '#3b82f6',
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            })}
          >
            <StyledIonicons name="flask" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
              Test Phase 1 & 2
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/audio-test')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#059669' : '#10b981',
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            })}
          >
            <StyledIonicons name="mic" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
              Test Phase 3 (Audio)
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 48, padding: 16, backgroundColor: '#f3f4f6', borderRadius: 8 }}>
          <Text style={{ fontSize: 14, color: '#374151', textAlign: 'center' }}>
            Phase 1 & 2: Database, Validation, AI{'\n'}
            Phase 3: Audio Recording, STT, TTS
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
