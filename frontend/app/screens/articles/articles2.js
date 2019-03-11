import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet,
} from 'react-native-ui-kitten';
import axios from 'axios';
import { SocialBar } from '../../components';
import NavigationType from '../../config/navigation/propTypes';


export class Articles2 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Problems List'.toUpperCase(),
  };

  state = {
    articles: [],
  };

  componentDidMount() {
    axios.get('http://192.168.1.43:8000/api/articles')
      .then(res => {
        this.setState({
          articles: res.data,
        });

      });
  }

  extractItemKey = (item) => `${item.id}`;

  onItemPressed = (item) => {
    this.props.navigation.navigate('Article', { id: item.id });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.onItemPressed(item)}>
      <RkCard rkType='imgBlock' style={styles.card}>
        <Image rkCardImg source={{ uri: `${item.image.toString().replace('http://127.0.0.1:8000/', '')}` }} />
        <View rkCardImgOverlay rkCardContent style={styles.overlay}>
          <RkText rkType='header4 inverseColor'>{item.title}</RkText>
        </View>
        <View rkCardFooter>
          <SocialBar rkType='space' showLabel likes={item.rating} comments={item.n_comments} is_solved={item.is_solved ? 'Solved' : "Doesn't solved"} />
        </View>
      </RkCard>
    </TouchableOpacity>
  );

  render = () => (
    <FlatList
      data={this.state.articles}
      renderItem={this.renderItem}
      keyExtractor={this.extractItemKey}
      style={styles.container}
    />
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  time: {
    marginTop: 5,
  },
}));
