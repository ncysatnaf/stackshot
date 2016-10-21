import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import apiMiddleware from '../middleware/api'

const loggerMiddleware = createLogger({
	predicate: (getState, action) => __DEV__
});


export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				thunkMiddleware,
				apiMiddleware,
				loggerMiddleware
			)
		)
	)
}
