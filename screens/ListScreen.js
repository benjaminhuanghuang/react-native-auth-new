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

class ListScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-options${focused ? '' : '-outline'}`} size={25} color={tintColor} />
        ),
    }

    constructor(props) {
        super(props);

        var ds = new ScrollView.DataSource({
            rowHasChanged: (r1, r2) => {
                r1 !== r2;
            }
        });
        this.state = {
            dataSource: ds,
            loaded: false
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        fetch("https://api.douban.com/v2/movie/in_theaters").then((response) => response.json()).then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
                loaded: true
            });
        }).done();
    };

    _renderRow(movie, index) {
        return (
            <View>
                <View style={styles.row} key={index}>
                    <Image style={styles.thumb}
                        source={{
                            uri: rowData.images.large
                        }} />
                    <View style={styles.texts}>
                        <Text style={styles.textTitle}>
                            {rowData.title}
                        </Text>
                        <Text style={styles.textTitle}>
                            年份: {rowData.year}
                        </Text>
                        <Text style={styles.textTitle}>
                            豆瓣评分: {rowData.rating.average}
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
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        textAlign: 'center',
    },
})

const mapStateToProps = state => ({
    movies: state.movies
});

export default connect(mapStateToProps)(ListScreen);