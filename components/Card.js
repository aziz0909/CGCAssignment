import React, {useState} from 'react';
// import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Button,
  View,
  TextInput,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import Modal from 'react-native-modal';

import {argonTheme} from '../constants';

class Card extends React.Component {
  state = {isModalVisible: false};
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      from,
    } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    const editTitle = inputTitle => {
      // Alert.alert(item.title);
      this.props.item.title = inputTitle;
    };

    const toggleModal = () => {
      if (from === 'album') {
        navigation.navigate('Image', {id: item.id});
      } else {
        if (this.state.isModalVisible) {
          this.setState({isModalVisible: false});
        } else {
          this.setState({isModalVisible: true});
        }
      }
    };

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => toggleModal()}>
          <Block flex style={imgContainer}>
            <Image
              source={{
                uri:
                  item.image !== undefined
                    ? item.image
                    : 'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80',
              }}
              style={imageStyles}
            />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => toggleModal()}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>
              {item.title}
            </Text>
            {from !== 'album' ? (
              <Text
                size={12}
                muted={!ctaColor}
                color={ctaColor || argonTheme.COLORS.ACTIVE}
                bold>
                Edit
              </Text>
            ) : (
              <View />
            )}
          </Block>
        </TouchableWithoutFeedback>

        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              backgroundColor: '#fff',
              paddingBottom: 20,
              paddingTop: 10,
              borderRadius: 10,
            }}>
            <TextInput
              style={{
                height: 50,
                borderColor: argonTheme.COLORS.NEW_PRIMARY,
                borderWidth: 1,
                borderRadius: 10,
              }}
              value={item.title}
              keyboardType="numeric"
              onChangeText={inputTitle => editTitle(inputTitle)}
              placeholder="Price"
            />

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  from: PropTypes.string,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default Card;
