import React from 'react';
import { View } from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent,
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';

export class SocialBar extends RkComponent {
  componentName = 'SocialBar';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {},
  };
  static data = {
    comments: '26',
    is_solved: "Doesn't solved",
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      is_solved: this.props.is_solved || SocialBar.data.is_solved,
    };
  }


  onCommentButtonPressed = () => {
  };


  render() {
    const {
      container, section, icon, label,
    } = this.defineStyles();

    const comments = this.state.comments + (this.props.showLabel ? ' Comments' : '');
    const is_solved = this.state.is_solved + (this.props.showLabel ? '' : '');

    return (
      <View style={container}>
        <View style={section}>
          <RkButton rkType='clear' onPress={this.onCommentButtonPressed}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.comment}</RkText>
            <RkText rkType='primary4 hintColor' style={label}>{comments}</RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear' >
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.slashEye}</RkText>
            <RkText rkType='primary4 hintColor' style={label}>{is_solved}</RkText>
          </RkButton>
        </View>
      </View>
    );
  }
}
