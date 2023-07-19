/*
    Scan button stateless component
*/

import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

type ScanBluetoothButtonProps = {
    color: string;
    onPress: () => void;
    text: string;
};
const ScanBluetoothButton = (props: ScanBluetoothButtonProps) => {

  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: props.color,
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: props.color,
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
  });
  
    return (
        <TouchableOpacity
      activeOpacity={0.5}
      style={styles.buttonStyle}
      onPress={props.onPress}>
      <Text style={styles.buttonTextStyle}>
        {props.text}
      </Text>
    </TouchableOpacity>
    );
};

export default ScanBluetoothButton;