import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types';

type Props = {
  user: User;
  onPress: () => void;
};

const COLORS = {
  cardBg: '#121212',
  primary: '#FFD900',
  secondaryText: '#9E9E9E',
  border: '#333333',
  green: '#84CC16',
  white: '#FFFFFF',
};

const UserItem = ({ user, onPress }: Props) => {
  const getInitial = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  const formatLastSeen = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <TouchableOpacity style={styles.userCard} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitial(user.username)}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.username}</Text>
        <Text style={[styles.statusText, user.online && styles.onlineStatus]}>
          {user.online ? 'Online' : formatLastSeen(user.lastSeen)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    marginHorizontal: '5%',
    marginVertical: '1.5%',
    padding: '4%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: '1%',
  },
  statusText: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  onlineStatus: {
    color: COLORS.green,
  },
});

export default UserItem;