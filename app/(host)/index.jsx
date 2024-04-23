import { Redirect } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';

export default function TabIndex() {
  const { isHost } = useAuth();

  if (isHost) return <Redirect href="/(host)/home" />;
  else return <Redirect href="/(user)/home" />;
}
