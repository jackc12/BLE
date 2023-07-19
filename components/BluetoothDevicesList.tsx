/*
    List of devices stateless component
*/
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native'

type BlueToothDevicesListProps = {
    devices: Map<string, string>;
};

const BlueToothDevicesList = (props: BlueToothDevicesListProps) => {
    const devicesStyles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22,
        },
        item: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 18,
            height: 28,
        },
      });
    return (
        <View style={devicesStyles.container}>
            {<FlatList data={Array.from(props.devices).map(device => ({name: device[1], id: device[0]}))}
            renderItem={({item}) => (
                <View id={item.id}>
                    <Text style={devicesStyles.item}>Name: {item.name}</Text>
                    <Text style={{paddingLeft: 20, paddingTop:10, fontSize: 12}}>ID: {item.id}</Text>
                </View>
            )}/>}
        </View>
    );
};

export default BlueToothDevicesList;