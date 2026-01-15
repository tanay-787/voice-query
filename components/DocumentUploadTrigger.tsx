/**
 * DocumentUploadTrigger Component
 * Button that opens the document upload BottomSheet
 */

import { Button } from 'heroui-native';
import React from 'react';
import { ThemedIcon } from './ThemedIcon';

interface DocumentUploadTriggerProps {
  onPress: () => void;
}

export function DocumentUploadTrigger({ onPress }: DocumentUploadTriggerProps) {
  return (
    <Button variant="primary" size="lg" onPress={onPress}>
      <ThemedIcon name="cloud-upload-outline" size={20} themeColor="accent-foreground" />
      <Button.Label>Upload Document</Button.Label>
    </Button>
  );
}
