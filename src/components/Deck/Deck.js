import React, { Component } from 'react';
import {
    View, 
    Animated, 
    PanResponder,
    Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 300;

class Deck extends Component {
    constructor(props) {
        super(props);
        /*
            1. What are we touching?
            2. What components handle touch?
            3. How is the gesture changing?
        */
        this.position = new Animated.ValueXY(0, 0);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (event, gestureState) => {
                this.position.setValue({
                    x: gestureState.dx,
                    y: gestureState.dy
                });
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gestureState.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            },
        });

        this.state = {
            index: 0,
        }
    }

    resetPosition() {
        Animated.spring(this.position, { // De esta manera, lo ANIMA hacia su posicion inicial
            toValue: {
                x: 0,
                y: 0,
            },
        }).start();
    }
    forceSwipe(direction) {
        Animated.timing(this.position, { // No es tan 'fancy'
            toValue: {
                x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
                y: 0,
            },
            duration: SWIPE_OUT_DURATION,
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        if (direction === 'right')
            onSwipeRight(item)
        else
            onSwipeLeft(item)
    }

    getCardStyle() {
        const { position } = this;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH*1.5, 0, SCREEN_WIDTH*1.5], // Pixels
            outputRange: ['-120deg', '0deg', '120deg'], // Son lineales
        });
        return {            
            ...position.getLayout(),
            transform: [{ rotate }],
        };
    }

    renderCards() {
        const { data, renderCard } = this.props;

        return data.map((item, i) => {

            if (i === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        {...this.panResponder.panHandlers}
                        style={this.getCardStyle()}
                    >{renderCard(item)}
                    </Animated.View>
                );
            }

            return renderCard(item)
        });
    }

    render() {

        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Deck