import { router } from 'expo-router';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { usePaymentUrl } from '../../providers/PaymentProvider';

export default function PaymentScreen() {
  const { paymentUrl } = usePaymentUrl();

  const handleNavigationChange = navState => {
    console.log(navState);
    if (navState.url.includes('https://www.google.com/')) {
      console.log(123);
      router.push('/success');
    }
  };

  return (
    <WebView
      style={styles.container}
      source={{ uri: paymentUrl }}
      onNavigationStateChange={handleNavigationChange}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
