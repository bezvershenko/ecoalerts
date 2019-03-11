import React from 'react';
import axios from 'axios';


import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import {
  Avatar,
  SocialBar,
} from '../../components';
import NavigationType from '../../config/navigation/propTypes';


export class Article extends React.Component {
  state = {
    article: {},
    mounted: false,
  };

  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Current problem'.toUpperCase(),
  };


  componentWillMount() {
    const articleId = this.props.navigation.getParam('id', 1);
    console.log(articleId);

    axios.get(`http://192.168.1.43:8000/api/articles/${articleId}`)
      .then(res => {
        this.setState({
          article: res.data,
          mounted: true,
        });
        console.log(this.state.article);
      });
  }

  render() {
    if (this.state.mounted) {
      return (
        <ScrollView style={styles.root}>
          <RkCard rkType='article'>
            <Image
              rkCardImg
              source={{
              uri: `${this.state.article.image.toString()
                .replace('http://127.0.0.1:8000/', '')}`,
            }}
            />
            <View rkCardHeader>
              <View>
                <RkText style={styles.title} rkType='header4'>{this.state.article.title}</RkText>
              </View>


            </View>
            <View rkCardContent>
              <View>
                <RkText rkType='primary3 bigLine'>{this.state.article.text}</RkText>
              </View>
            </View>
            <View rkCardFooter>
              <SocialBar comments={this.state.article.n_comments} is_solved={this.state.article.is_solved ? 'Solved' : "Doesn't solved"}/>
            </View>
          </RkCard>
        </ScrollView>

      );
    }
    return null;
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  title: {
    marginBottom: 5,
  },
}));
