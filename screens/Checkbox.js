import React from 'react';
import {  Text, StyleSheet, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Checkbox = ({ children, ...props }) => {
  return (
    <View>
      <View>
        <CheckBox
     
          type={'checkbox'}
          {...props}
        />
        <Text allowFontScaling={false}>{children}</Text>
      </View>
    </View>
  );
};

export {Checkbox};