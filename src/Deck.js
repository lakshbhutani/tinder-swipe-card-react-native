import React, { Component } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';

export default class Deck extends Component {
  constructor(props) {
    super(props);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        console.log(`event ${event}`, `gesture ${gesture}`);
      },
      onPanResponderRelease: () => {}
    })

    this.state = { panResponder }
  }

  renderCards = () => {
    const { data, renderCard } = this.props;
    const myData = data.map(item => renderCard(item));
    console.log(myData);
    return myData;
  }

  render() {
    const { panResponder } = this.state;
    return (
      <View {...panResponder.panHandlers}>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
