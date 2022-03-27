import {Platform, StatusBar, Dimensions} from 'react-native';
import {theme} from 'galio-framework';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0);
export const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812);
