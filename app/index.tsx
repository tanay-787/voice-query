import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Avatar,
  Button,
  Card,
  ScrollShadow,
  Spinner,
  Surface,
  TextField,
  cn
} from 'heroui-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

// Types
type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

// Initial Data
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000),
  },
];

export default function AIInterfaceScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm a demo AI. I can't actually process requests yet, but this UI looks great!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isLoading]);

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';
    
    return (
      <View 
        key={message.id} 
        className={cn(
          "flex-row mb-4 max-w-[85%]",
          isUser ? "self-end justify-end" : "self-start justify-start"
        )}
      >
        {!isUser && (
          <Avatar alt='user' size="sm" className="mr-2 mt-1">
            <Avatar.Fallback className="bg-primary">AI</Avatar.Fallback>
          </Avatar>
        )}
        
        <Card 
          variant={isUser ? "default" : "secondary"} 
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser ? "bg-primary border-primary" : "bg-surface-secondary"
          )}
        >
          <Text 
            className={cn(
              "text-base",
              isUser ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {message.content}
          </Text>
        </Card>

        {isUser && (
          <Avatar alt='user-avatar' size="sm" className="ml-2 mt-1">
            <Avatar.Fallback className="bg-surface-tertiary">ME</Avatar.Fallback>
          </Avatar>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <Surface className="px-4 py-3 border-b border-divider flex-row items-center justify-between z-10">
        <View className="flex-row items-center gap-3">
          <Avatar alt='ai-assistant' color="accent">
            <Avatar.Fallback>AI</Avatar.Fallback>
          </Avatar>
          <View>
            <Text className="text-lg font-bold text-foreground">AI Assistant</Text>
            <Text className="text-xs text-muted">Always here to help</Text>
          </View>
        </View>
        <Button size="sm" variant="ghost" isIconOnly>
          <Button.Label>
            <StyledIonicons name="ellipsis-horizontal" size={20} className="text-foreground" />
          </Button.Label>
        </Button>
      </Surface>

      {/* Chat Area */}
      <View className="flex-1">
        <ScrollShadow 
          className="flex-1" 
          size={40} 
          LinearGradientComponent={LinearGradient}
        >
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map(renderMessage)}
            
            {isLoading && (
              <View className="flex-row self-start mb-4 items-center">
                 <Avatar alt='ai-assistant' size="sm" className="mr-2">
                    <Avatar.Fallback className="bg-primary">AI</Avatar.Fallback>
                  </Avatar>
                  <Surface variant="secondary" className="rounded-2xl px-4 py-3 h-12 justify-center">
                    <View className="flex-row gap-1">
                      <Spinner size="sm" color="default" />
                    </View>
                  </Surface>
              </View>
            )}
          </ScrollView>
        </ScrollShadow>
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <Surface className="p-4 border-t  bg-surface">
          <View className="flex-row gap-2 items-end">
            <Button variant="ghost" isIconOnly className="mb-0.5">
              <Button.Label>
                <StyledIonicons name="add" size={24} className="text-muted" />
              </Button.Label>
            </Button>
            
            <View className="flex-1">
              <TextField>
                <TextField.Input 
                  placeholder="Type a message..." 
                  value={inputValue}
                  onChangeText={setInputValue}
                  
                  className="bg-surface-secondary border-transparent rounded-2xl"
                  onSubmitEditing={handleSend}
                >
                  <TextField.InputEndContent className="justify-end pb-0.5 pr-0.5">
                    <Button 
                      variant={inputValue.trim() ? "primary" : "secondary"} 
                      isIconOnly
                      size="sm"
                      onPress={handleSend}
                      isDisabled={!inputValue.trim() || isLoading}
                      className="rounded-full h-8 w-8"
                    >
                      <Button.Label>
                         <StyledIonicons 
                            name="arrow-up" 
                            size={18} 
                            className={inputValue.trim() ? "text-primary-foreground" : "text-muted"} 
                          />
                      </Button.Label>
                    </Button>
                  </TextField.InputEndContent>
                </TextField.Input>
              </TextField>
            </View>
          </View>
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}