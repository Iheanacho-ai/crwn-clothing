import { all, call} from 'react-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.saga';

export default function* rootSaga(){
    yield all([
        call(fetchCollectionsStart),
        call(userSagas)
    ])
};