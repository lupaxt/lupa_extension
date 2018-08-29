import React from 'react';
import ReactDOM from 'react-dom';
// import '../style.css'
import StarRatingComponent from 'react-star-rating-component'
import {DB, auth} from "../Authentication/firebase";


//TODO abstract star component
//TODO post and fetch from FiBa API
//TODO emoji rating bar
//TODO commenting on content or even text on a page -- eg kindle reader snippets
//TODO add tooltip to Rating Component
//TODO make Rater removable on some pages


/*
TODO FLOW
TODO LOGINED / REGISTERED / GO BACK BUTTON @ AUTHstate
TODO GROUP VIEW
 */

/*TODO API
TODO DELETE RATING, ADD RATING, CHANGE RATING for URL
TODO ON RATING --> PARSE URL -->UPDATE ALL RATINGS FOR THIS URL
TODO
*/

const wisData = {
    users: {
        ['someUID']: {
            urlsRead: {
                url: {
                    rating: 0, // 0 === deleted
                    //0 - 5
                    emotions: ['emojiArray'],
                    thoughts: "I think this arctile is a piece of donkey shit lalaladi"
                },
                anotherUrl: {}
            }
        }
    }
};


console.log(auth, "auth", auth.currentUser)
console.log(DB, "DB")
// const USERID = auth.currentUser.uid;
const URL = window.location.href;

DB.child('contents').once('value', snapShot => {
    const contents = snapShot.val();
    console.log("contents", contents)
    },
    err => console.log(err)
);
// content.once('value',
//     snapShot => console.log("getting this value once", snapShot.val()),
//     err => console.log(err)
// );

// const newPostKey = firebase.database().ref().child('content').push().key;
// console.log(newPostKey, 'new key');


const styling = {
    container: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 999999,
        // background: "black",
        fontSize: 12 + 'px',
        height: 10 + 'vh',
        width: 10 + 'vw'
    }
}

class Rater extends React.Component {
    constructor(props) {
        super();

        this.state = {
            rating: 0,
            rated: false,
            commentSubmitted: false,
            comment: "...",
        }
    }

    onRemoveRate() {
        //
    }

    onRate(rating) {
        const shouldReset = ( this.state.rating === rating );
        //just for UI
        this.setState({
            rating: shouldReset ? 0 : rating,
            rated: true
        })

        if (shouldReset) {
            //TODO DB.delete rating for user for content
            //utility functions
        } else {
            //TODO DB.set rating for user for content
        }

    }

    onComment() {
        //TODO
    }

    onRemoveComment() {

    }


    render() {
        return (
            <React.Fragment>
                <section style={styling.container}>
                    <p style={{fontSize: '8px'}}>
                        No articles on this page? Forgive me, I still have to write the code that decides if to hide
                        this
                        footer when it's not needed
                    </p>

                    {this.state.rated &&
                    <React.Fragment>
                    <textarea onChange={(ev) => console.log('val', ev.target.value)}
                              placeholder="Now, how do you really feel?"
                              cols="30" rows="5"/>
                        <button>Comment ✅</button>
                    </React.Fragment>}

                    {this.state.rated &&
                    <button onClick={() => {
                        this.setState({rated: false, rating: 0});
                    }}>Reset rating for this piece
                    </button>}

                </section>

                    <StarRatingComponent
                        name="rate1" starCount={5}
                        editing={true} value={this.state.rating}
                        onStarHover={(rating) => this.state.rated ? null : this.setState({rating: rating})}
                        onStarClick={this.onRate}
                    />
                Your App!
            </React.Fragment>
        )
    }
}

export default Rater;