import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import { icons } from '../constants';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  keyboardType = 'default',
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-500 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-white rounded-2xl border-2 border-gray-700 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#ccc"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
