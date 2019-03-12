import React from 'react';
import axios from 'axios';
import {
    ScrollView,
    Image,
    View,
    RefreshControl,
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
import {HOST} from '../../constants'


export class Article extends React.Component {
    state = {
        article: {},
        mounted: false,
        refreshing: false,
    };

    static propTypes = {
        navigation: NavigationType.isRequired,
    };
    static navigationOptions = {
        title: 'Current problem'.toUpperCase(),
    };


    componentWillMount() {
        this.makeRemoteRequest()
    }

    makeRemoteRequest = () => {
        const articleId = this.props.navigation.getParam('id', 1);
        console.log(articleId);

        axios.get(`${HOST}/api/articles/${articleId}`)
            .then(res => {
                this.setState({
                    article: res.data,
                    mounted: true,
                    refreshing: false,
                });
                console.log(this.state.article);
            });
    };

    handleRefresh = () => {
        this.setState({
            refreshing: true,
        }, () => {
            setTimeout(() => {
                this.makeRemoteRequest()
            }, 500)

        })
    };


    render() {
        if (this.state.mounted) {
            return (
                <ScrollView style={styles.root} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />}>
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
                            <SocialBar comments={this.state.article.n_comments}
                                       is_solved={this.state.article.is_solved ? 'Solved' : "Doesn't solved"}/>
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
