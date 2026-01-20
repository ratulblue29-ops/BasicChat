import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, User } from '../types';
import styles from '../styles/chatListScreen.style';
import UserItem from '../components/UserItem';
import socketService from '../services/socketService';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChatList'>;
  route: RouteProp<RootStackParamList, 'ChatList'>;
};

const ChatListScreen = ({ navigation, route }: Props) => {
  const { userId, username } = route.params;
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const socket = socketService.getSocket();

    if (socket) {
      socket.on('users:update', (usersData: Record<string, User>) => {
        const usersList = Object.values(usersData).filter(
          (user) => user.id !== userId
        );
        setUsers(usersList);
      });
    }

    return () => {
      if (socket) {
        socket.off('users:update');
      }
    };
  }, [userId]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserPress = (user: User) => {
    navigation.navigate('Chat', {
      currentUserId: userId,
      otherUser: user,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Chats</Text>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.onlineDot} />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <UserItem user={item} onPress={() => handleUserPress(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No users online. Start chatting by logging in from another device!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;