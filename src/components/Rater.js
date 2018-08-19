import React from 'react';
import ReactDOM from 'react-dom';
// import '../style.css'
import StarRatingComponent from 'react-star-rating-component'
// import firebase from 'firebase'


//TODO abstract star component
//TODO post and fetch from FiBa API
//TODO emoji rating bar
//TODO commenting on content or even text on a page -- eg kindle reader snippets
//TODO add tooltip to Rating Component

// Initialize Firebase
//
// const isFirebaseSetup = function() {
//     if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
//         window.alert('You have not configured and imported the Firebase SDK. ' +
//             'Make sure you go through the codelab setup instructions and make ' +
//             'sure you are running the codelab using `firebase serve`');
//     }
//     return false;
// }

class Rater extends React.Component {
    constructor(props) {
        super();

        this.state = {
            rating: 0,
            rated: false,
        }
    }

    render() {
        return (
            <div>
                Your App!
                <center style={{marginBottom: '40px', marginTop: '30px'}}>
                    {/*<Rate id={'rate123'} allowHalf value={3}/>*/}
                </center>
                {console.log('teoreore', this.state)}
                {this.state.rated ? (
                    <React.Fragment>
                    <textarea onChange={(ev) => console.log('val', ev.target.value)}
                              placeholder="Now, how do you really feel?"
                              cols="30" rows="5"/>
                        <button>Comment ✅</button>
                    </React.Fragment>

                ) : null}
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    editing={true}
                    value={this.state.rating}
                    onStarHover={(rating) => this.state.rated ? null : this.setState({rating: rating})}
                    onStarClick={(rating) => this.setState(prev => ({rating, rated: true}))}
                />
                <button onClick={() => {
                    this.setState({rated: false, rating: 0});
                    //TODO API CALL TO DELETE RATING
                }}>Remove rating
                </button>
            </div>
        )
    }
}

export default Rater;