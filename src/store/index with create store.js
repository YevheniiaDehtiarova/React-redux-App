import {
    legacy_createStore as createStore,
    combineReducers,
    compose,
    applyMiddleware
} from "redux";
import ReduxThunk from "redux-thunk";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

/*create middleware*/
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === "string") {
        return next({ type: action });
    }
    return next(action);
};

/*create enhancer*/
const enhancer =
    (createStore) =>
        (...args) => {
            const store = createStore(...args);

            const oldDispatch = store.dispatch;
            store.dispatch = (action) => {
                if (typeof action === "string") {
                    return oldDispatch({ type: action });
                }
                return oldDispatch(action);
            };
            return store;
        };
/*create store with enhancer*/
// const store = createStore(
//   combineReducers({ heroes, filters }),
//   compose(
//     enhancer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

/*create with middleweare*/
const store = createStore(
    combineReducers({ heroes, filters }),
    compose(applyMiddleware(ReduxThunk,stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
