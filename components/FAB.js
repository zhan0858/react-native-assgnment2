import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet, Animated } from 'react-native';

export default FAB = (props) => {
	const [animation] = useState(new Animated.Value(0));

	const handlePressIn = () => {
		Animated.timing(animation, {
			toValue: 1,
			duration: 200,
			useNativeDriver: false,
		}).start();
	};
	const handlePressOut = () => {
		Animated.timing(animation, {
			toValue: 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}

	const backgroundColor = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ['transparent', 'rgba(165, 129, 251, 0.9)'],
	});

	return (
		<Pressable
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={props.onPress}
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
			]}
		>
			<Animated.View style={[styles.buttonBackground, { backgroundColor }]}>
				<AntDesign style={styles.addButton} name="pluscircle" size={36} color="black" />
			</Animated.View>
		</Pressable>
	);
};


const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		position: 'absolute',
		bottom: 70,
		right: 40,
	},
	buttonBackground: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		borderRadius: 9999,
	},
	pressed: {
		opacity: 0.8,
	},
	addButton: {
		backgroundColor: "#fff",
		padding: 0
	},

});