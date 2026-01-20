import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#111111',
  cardBg: '#121212',
  primary: '#FFD900',
  secondaryText: '#9E9E9E',
  border: '#333333',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: '3%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  headerStatus: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: '1%',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  messagesContent: {
    paddingBottom: '2%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    color: COLORS.white,
    marginRight: '2%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingIndicator: {
    paddingHorizontal: '5%',
    paddingVertical: '1%',
  },
  typingText: {
    fontSize: 12,
    color: COLORS.secondaryText,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
});

export default styles;