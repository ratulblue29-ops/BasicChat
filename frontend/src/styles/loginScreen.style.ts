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
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: '5%',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: '2%',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: '4%',
    paddingVertical: '1%',
    marginBottom: '6%',
  },
  input: {
    color: COLORS.white,
    fontSize: 16,
    paddingVertical: '3%',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: '4%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3D00',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: '4%',
  },
});

export default styles;