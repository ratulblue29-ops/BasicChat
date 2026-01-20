import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#111111',
  cardBg: '#121212',
  primary: '#FFD900',
  secondaryText: '#9E9E9E',
  border: '#333333',
  green: '#84CC16',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginRight: '3%',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    paddingHorizontal: '3%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    paddingVertical: '3%',
    marginLeft: '2%',
  },
  listContent: {
    paddingVertical: '2%',
  },
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
  userInfo2: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
});

export default styles;