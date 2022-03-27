import React, {useState} from 'react';
import {StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Block, theme} from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Card} from '../../components';
import articles from '../../constants/articles';
const {width} = Dimensions.get('screen');

export function AlbumView({navigation}) {
  const [items, setItems] = useState([]);
  React.useEffect(() => {
    const test = async () => {
      getDropdown();
    };

    test();
  }, []);

  const getDropdown = () => {
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        setItems(res);
      });
  };

  const RenderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {items.map((data, index) => (
            <Card
              key={index}
              item={data}
              from={'album'}
              navigation={navigation}
              horizontal
            />
          ))}
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      <RenderArticles />
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

/*
<Card item={articles[0]} horizontal />
<Block flex row>
  <Card item={articles[1]} style={{marginRight: theme.SIZES.BASE}} />
  <Card item={articles[2]} />
</Block>
<Card item={articles[3]} horizontal />
 */
