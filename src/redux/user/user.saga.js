import { takeLatest, put, all,call } from 'redux-saga/effects';

import { signInSuccess, signInFailure} from './user.actions';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth){
    try{
        const userRef = yield call( createUserProfileDocument , userAuth );
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data()}));

    }catch(error){
        yield put(signInFailure(error));
         
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth( user );

    }catch(error){
        yield put(signInFailure(error));
         
    }
}

export function* signInWithEmail({ payload: { email, password}}){
    try{
        const { user } = yield auth.signInWithEmailAndPassword( email, password );
        yield getSnapshotFromUserAuth( user );
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest( UserActionTypes.GOOGLE_SIGN_IN_START, )
} 

export function* onEmaiilSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail )
}

export function* onCheckUserSession(){
    yield takeLatest()
}

export function* userSaga(){
    yield all([call(onGoogleSignInStart), call(onEmaiilSignInStart)]);
}