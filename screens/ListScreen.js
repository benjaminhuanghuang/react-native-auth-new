import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux';
//
import { getMovies } from '../redux/actions';

class ListScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-options${focused ? '' : '-outline'}`} size={25} color={tintColor} />
        ),
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getMovies();
    }

    _renderRow(movie, index) {
        return (
            <View key={index}>
                <View style={styles.row} >
                    <Image style={styles.thumb}
                        source={{
                            uri: movie.images.large
                        }} />
                    <View style={styles.texts}>
                        <Text style={styles.textTitle}>
                            {movie.title}
                        </Text>
                        <Text style={styles.textTitle}>
                            年份: {movie.year}
                        </Text>
                        <Text style={styles.textTitle}>
                            豆瓣评分: {movie.rating.average}
                        </Text>
                    </View>
                </View>
                <View style={styles.separator} />
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.props.movies.map((movie, index) => {
                            return this._renderRow(movie, index);
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        padding: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE'
    },
    thumb: {
        width: 60,
        height: 80,
        borderRadius: 2
    },
    textTitle: {
        flex: 1,
        textAlign: "left",
        paddingLeft: 10,
        fontWeight: "bold",
        flexDirection: 'row',
        color: "#666666"
    },
    texts: {
        flexDirection: 'column',
        paddingTop: 5
    }
})

const mapStateToProps = state => ({
    movies: state.movies
});

const mapActionsToProps = {
    getMovies: getMovies
}
export default connect(mapStateToProps, mapActionsToProps)(ListScreen);