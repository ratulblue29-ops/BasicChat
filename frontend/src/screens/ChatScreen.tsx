import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Message } from '../types';
import styles from '../styles/chatScreen.style';
import ChatBubble from '../components/ChatBubble';
import socketService from '../services/socketService';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Chat'>;
  route: RouteProp<RootStackParamList, 'Chat'>;
};

const ChatScreen = ({ navigation, route }: Props) => {
  const { currentUserId, otherUser } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (socket) {
      socket.emit('messages:fetch', otherUser.id);

      socket.on('messages:fetched', (fetchedMessages: Message[]) => {
        setMessages(fetchedMessages);
      });

      socket.on('message:receive', (message: Message) => {
        if (
          message.senderId === otherUser.id &&
          message.receiverId === currentUserId
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      socket.on('message:sent', (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on('typing:user', (data: { userId: string; typing: boolean }) => {
        if (data.userId === otherUser.id) {
          setIsTyping(data.typing);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('messages:fetched');
        socket.off('message:receive');
        socket.off('message:sent');
        socket.off('typing:user');
      }
    };
  }, [currentUserId, otherUser.id]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const socket = socketService.getSocket();
    if (socket) {
      socket.emit('message:send', {
        receiverId: otherUser.id,
        message: inputText.trim(),
      });
      setInputText('');
      socket.emit('typing:stop', otherUser.id);
    }
  };

  const handleTyping = (text: string) => {
    setInputText(text);

    const socket = socketService.getSocket();
    if (!socket) return;

    if (text.trim()) {
      socket.emit('typing:start', otherUser.id);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing:stop', otherUser.id);
      }, 1000);
    } else {
      socket.emit('typing:stop', otherUser.id);
    }
  };

  const getInitial = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitial(otherUser.username)}
            </Text>
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{otherUser.username}</Text>
            <Text style={styles.headerStatus}>
              {otherUser.online ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              isOwnMessage={item.senderId === currentUserId}
            />
          )}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No messages yet. Start the conversation!
              </Text>
            </View>
          }
        />

        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>{otherUser.username} is typing...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9E9E9E"
            value={inputText}
            onChangeText={handleTyping}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Send size={24} color="#111827" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;