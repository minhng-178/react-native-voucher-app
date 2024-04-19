import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageConstants = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

export const asyncStorage = (function () {
  async function _setToken(accessToken) {
    if (accessToken) {
      await AsyncStorage.setItem('accessToken', accessToken);
    }
  }

  async function _setRefreshToken(refreshToken) {
    if (refreshToken) {
      await AsyncStorage.setItem('refreshToken', refreshToken);
    }
  }

  async function _getAccessToken() {
    return await AsyncStorage.getItem('accessToken');
  }

  async function _getRefreshToken() {
    return await AsyncStorage.getItem('refreshToken');
  }

  async function _clearToken() {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('walletName');
  }

  return {
    setToken: _setToken,
    setRefreshToken: _setRefreshToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
