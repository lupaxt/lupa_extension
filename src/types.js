import {struct, superstruct} from 'superstruct'
import isEmail from 'is-email'
import isUuid from 'is-uuid'
import isUrl from 'is-url'
import uuidv4 from 'uuid/v4';


const struct = superstruct({
    types: {
        //firebase handles email legitness usually
        email: value => isEmail(value) && value.length < 256,
        uuid: value => isUuid.v4(value),
        displayName: value => typeof value === 'string' && value.length > 3,
        url: value => isUrl(value),
        comment: value => typeof value === 'string' && value.length > 7
    }
});

const User = struct({
    id: 'uuid',

    handle: 'displayName',
    firebaseUID: 'string',
    groups: ['uuid'],
    reviews: ['uuid'],
    // contents: ['uuid']
})

const Group = struct({
    id: 'uuid',
    name: 'displayName',
    users: ['uuid']
})

const Content = struct({
    id: 'uuid',

    name: 'displayName',
    url: 'url',
    content: 'string?',
    reviews: ['uuid']
})

const Review = struct({
    id: 'uuid',

    user: 'uuid',
    content: 'uuid',
    rating: 'number',
    comment: 'comment'
})

const Response = struct({

});