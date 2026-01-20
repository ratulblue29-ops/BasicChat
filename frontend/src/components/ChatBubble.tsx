import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';

type Props = {
  message: Message;
  isOwnMessage: boolean;
};

const COLORS = {
  primary: '#FFD900',
  cardBg: '#121212',
  secondaryText: '#9E9E9E',
  border: '#333333',
};

const ChatBubble = ({ message, isOwnMessage }: Props) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isOwnMessage ? styles.ownText : styles.otherText,
          ]}
        >
          {message.message}
        </Text>
        <Text
          style={[
            styles.timeText,
            isOwnMessage ? styles.ownTimeText : styles.otherTimeText,
          ]}
        >
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '1.5%',
    maxWidth: '75%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingHorizontal: '4%',
    paddingVertical: '2.5%',
    borderRadius: 16,
  },
  ownBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: '2%',
  },
  ownText: {
    color: '#111827',
  },
  otherText: {
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  ownTimeText: {
    color: '#111827',
    opacity: 0.7,
  },
  otherTimeText: {
    color: COLORS.secondaryText,
  },
});

export default ChatBubble;