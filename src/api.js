import {DB} from "./Authentication/firebase";


const ratings = DB('contents').ref();
const content = root.child('content');
const users = root.child('users');

const setRating = function({rating, userID, url}) {

}