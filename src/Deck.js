import React, { Component } from 'react';
import { StyleSheet, PanResponder, Animated, View, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        console.log(`event ${event}`, `gesture ${gesture}`);
      },
      onPanResponderRelease: () => {}
    })

    this.state = { panResponder, position };
    console.log(this.state); // Above statement directly assigns the value of panResponder and position in this.state with the same variable name.

  }


  getLayout = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-'300', '0', '300'],
      outputRange: [-'120', '0', '120']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  renderCards = () => {
    const { data, renderCard } = this.props;
    const { panResponder, position } = this.state;
    const myData = data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getLayout()}
            {...panResponder.panHandlers}
          >
            { renderCard(item) }
          </Animated.View>
        );
      }

      return renderCard(item);
    });
    console.log(myData);
    return myData;
  }

  render() {
    return (
      <View>
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
