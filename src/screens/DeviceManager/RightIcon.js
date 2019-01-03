import React from 'react';
import { 
  View,
  Text,
  Button
} from 'react-native';
import { ToggleSwitch } from '../../components';
import colors from '../../contants/colors';

export default ({ device, onStatusChange, onOption }) => (
  <View>
    <Button 
      title="Configuracion"
      onPress={onOption}
    />
    {(device.active) && (
      <ToggleSwitch
        isOn={device.status}
        onColor="green"
        offColor="red"
        size="small"
        onToggle={onStatusChange}
      />
    )}
  </View>
)