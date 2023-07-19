import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BlueToothDevicesList from './components/BluetoothDevicesList';
import ScanBluetoothButton from './components/ScanBluetoothButton';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  // Use map so can't have duplicate devices
  const [foundBtDevices, setFoundBtDevices] = useState(new Map());
  // Start the Bluetooth scanner
  useEffect(() => {
    BleManager.start({showAlert: false}).then(() => {
      console.log('BLE Manager initialized');
    })
    .catch(error => {
      console.log(error)
    });

    // When device is found add to list of devices in local state
    let discoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (device) => {
        if (device.name != undefined && device.id != undefined) {
          console.log(`device: ${device.name}`)
          foundBtDevices.set(device.id.trim(), device.name.trim());
          setFoundBtDevices(foundBtDevices);
        }
      },
    );

    // When scanning stops set isScanning to false in local state
    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan is stopped');
      },
    );
    return () => {
      discoverListener.remove();
      stopListener.remove();
    };
  }, []);

  const startScan = () => {
    foundBtDevices.clear();
    // Don't start scanning if already scanning
    if (!isScanning) {
      // Scan all devices in range for one seconds and don't allow duplicates
      BleManager.scan([], 2, false)
        .then(() => {
          console.log("IS SCANNING")
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };
  
  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
        <View>
          <View>
            <Text
              style={styles.title}>
              Taco Comfort Solutions
            </Text>
          </View>
          <ScanBluetoothButton onPress={startScan} text={isScanning ? 'Scanning...' : 'Scan for Bluetooth Devices'} color={'#307ecc'}/>
          <ScanBluetoothButton onPress={() => {
            foundBtDevices.clear();
            setFoundBtDevices(new Map());
          }}text={'Clear Bluetooth Devices'} color={'red'}/>
        </View>
        <BlueToothDevicesList devices={foundBtDevices}/>
    </SafeAreaView>
  );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.black,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
});


export default App;