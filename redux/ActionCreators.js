import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
// I wrote the first action creator using double function instead of double fat arrow, just to understand it better

/* COMMENTS START */
export const add = function (x) {
    return function (y) {
        return x + y
    }
}
export const fetchComments = function () {
    return function (dispatch) {
        return fetch(baseUrl + 'comments')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error' + response.status + ': ' + response.statusText)
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errMesss = new Error(error.message)
                    throw errMesss;
                })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error => dispatch(commentsFailed(error.message)))

    }
}
// export const commentsFailed = (errMess) => ({
//     type: ActionTypes.COMMENTS_FAILED,
//     payload: errMess
// });

export const commentsFailed = function (errMess) {
    return ({
        type: ActionTypes.COMMENTS_FAILED,
        payload: errMess
    })
}
// export const addComments = (comments) => ({
//     type: ActionTypes.ADD_COMMENTS,
//     payload: comments
// })
export const addComments = function (comments) {
    return ({
        type: ActionTypes.ADD_COMMENTS,
        payload: comments
    })
}
/* COMMENTS END */
//------------------------------------------------
// export const add = x => y => x + y
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

//-----------------------------------------
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMesss = new Error(error.message)
                throw errMesss;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

//------------------------------------
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMesss = new Error(error.message)
                throw errMesss;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))

}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});
export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 800);
}


// Action creator, that returns an object
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})
// Action creator, that returns a function that dispatches the comment after 2 seconds
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    setTimeout(() => {
        dispatch(addComment(newComment))
    }, 800);
}

// Process for persisting state through application: FAVORITES
// 1 Action types  2 Action creators  3 Setup the new reducers and add it to the redux store
// 4 persist this info by dispatching the appropiate actions when the user selects their dish as favorites