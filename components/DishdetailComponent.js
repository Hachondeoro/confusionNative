import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Rating, Input } from 'react-native-elements';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});
// State is not persisting in: 1 when coming back to the menu and selecting the same dish   2 When reloading

function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.cardIcon}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#F50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#7018e4'
                        onPress={() => props.showModal()}
                    />
                </View>
            </Card>
        );
    }
    else {
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <View style={styles.commentRating}>
                    <Rating imageSize={12} readonly startingValue={item.rating} style={{ marginLeft: 0 }} />
                </View>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }
    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
        </Card>
    )

}


class Dishdetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            comment: '',
            rating: 3,
            showModal: false
        }
    }
    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }
    resetForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: ''
        });
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }


    handleSubmit(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleModal();
        this.resetForm();
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    showModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'fade'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal() }}
                    onRequestClose={() => { this.toggleModal() }}
                >
                    <View style={styles.modal}>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={60}
                            showRating
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                        />
                        <Text style={styles.modalText}>Author:</Text>
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => this.setState({ author: value })}
                        />
                        <Text style={styles.modalText}>Comment</Text>
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        <Button
                            color='#7018e4'
                            title='SUBMIT'
                            onPress={() => this.handleSubmit(dishId)}
                        ></Button>
                        <Button
                            color='#7a7878'
                            title='CANCEL'
                            onPress={() => { this.toggleModal(); this.resetForm() }}
                        ></Button>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#f13d3d',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold'
    },
    cardIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    commentRating: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);