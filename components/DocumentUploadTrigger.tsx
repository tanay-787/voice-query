/**
 * DocumentUploadTrigger Component
 * Button that opens the document upload BottomSheet
 */

import React from 'react';
import { Button } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

interface DocumentUploadTriggerProps {
  onPress: () => void;
}

export function DocumentUploadTrigger({ onPress }: DocumentUploadTriggerProps) {
  return (
    <Button variant="primary" size="lg" onPress={onPress}>
      <StyledIonicons
        name="cloud-upload-outline"
        size={20}
        className="text-primary-foreground mr-2"
      />
      <Button.Label>Upload Document</Button.Label>
    </Button>
  );
}
