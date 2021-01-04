import { call, put, takeLatest } from 'redux-saga/effects';
import { firestore,  convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {
    fetchCollectionSuccess,
    fetchCollectionsFailure

} from './shop.actions'
import ShopActionTypes from './shop.types';

export function* fetchCollectionStartAsync(){

    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call (convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));

    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }

}


export function* fetchCollectionStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionStartAsync )
}