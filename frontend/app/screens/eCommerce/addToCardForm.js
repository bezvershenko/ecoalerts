import React from 'react';
import axios from 'axios';
import {
  View,
  Keyboard,
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkAvoidKeyboard,
} from 'react-native-ui-kitten';
import { GradientButton } from '../../components/';
import { PasswordTextInput } from '../../components/passwordTextInput';

import { scale } from '../../utils/scale';
import NavigationType from '../../config/navigation/propTypes';

export class AddToCardForm extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Add Card'.toUpperCase(),
  };

  state = {
    name: '',
    email: '',
    problem: '',

  };


  onAddButtonPressed = () => {
    axios.post('http://192.168.1.43:8000/api/articles/', {
      title: this.state.problem.split(' ').slice(0, 5),
      text: this.state.problem,

    })
    this.props.navigation.goBack();
  };

  render = () => (
    <RkAvoidKeyboard
      style={styles.screen}
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}>
      <View style={[styles.formContent]}>
        <View>


          <View style={[styles.content]}>
            <View style={[styles.textRow]}>
              <RkText rkType='subtitle'>Your name</RkText>
            </View>
            <RkTextInput
              rkType='rounded'
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
          </View>

          <View style={[styles.content]}>
            <View style={[styles.textRow]}>
              <RkText rkType='subtitle'>Your e-mail</RkText>
            </View>
            <RkTextInput
              rkType='rounded'
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={[styles.content]}>
            <View style={[styles.textRow]}>
              <RkText rkType='subtitle'>Describe eco-problem</RkText>
            </View>
            <RkTextInput
              rkType='rounded'
              onChangeText={(problem) => this.setState({ problem })}
              value={this.state.problem}
            />
          </View>


        </View>
        <View>
          <GradientButton
            rkType='large'
            text='ADD TO CARD'
            onPress={this.onAddButtonPressed}
          />
        </View>
      </View>
    </RkAvoidKeyboard>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 15,
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  content: {
    marginTop: 10,
  },
  formContent: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  textRow: {
    marginLeft: 20,
  },
  expireDateBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  expireDateInput: {
    flex: 0.48,
    marginVertical: 10,
  },
  expireDateInnerInput: {
    textAlign: 'center',
  },
  expireDateDelimiter: {
    flex: 0.04,
  },
  balloon: {
    maxWidth: scale(250),
    padding: 15,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: theme.colors.border.solid,
  },
}));
