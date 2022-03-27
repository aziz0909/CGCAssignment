import _ from 'lodash';
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// import {Colors, View, Card, CardProps, Button, Text} from 'react-native-ui-lib';
const cardImage = require('../assets/images/card-example.jpg');
import {connect} from 'react-redux';

class ImageView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            width: 200,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => this.props.increaseCounter()}>
            <Text style={{fontSize: 20}}>Increase</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 20}}>{this.props.counter}</Text>
          <TouchableOpacity onPress={() => this.props.decreaseCounter()}>
            <Text style={{fontSize: 20}}>Decrease</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch({type: 'INCREASE_COUNTER'}),
    decreaseCounter: () => dispatch({type: 'DECREASE_COUNTER'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
