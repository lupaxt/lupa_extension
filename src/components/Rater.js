import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
// import '../style.css'
// import StarRatingComponent from 'react-star-rating-component'
import {auth} from "../Authentication/firebase";
import ReactTooltip from 'react-tooltip';
import api from '../api'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from 'reactstrap'


/*TODO API
TODO DELETE RATING, ADD RATING, CHANGE RATING for URL
TODO ON RATING --> PARSE URL -->UPDATE ALL RATINGS FOR THIS URL
TODO
*/

const styling = {
    container: {
        position: 'fixed',
        bottom: 10,
        left: 10,
        // right: 0,
        zIndex: 999999,
        // background: "black",
        fontSize: 14 + 'px',
        // height: 10 + 'vh',
        // width: 10 + 'vw'
    },
    lupa: {
        background: "DarkTurquoise",
        fontSize: 1 + 'em',
        color: "white",
        fontWeight: 'bold',
        width: 2.5 + 'rem',
        height: 2.5 + 'rem'
    },
    clickBar: {
        background: "DarkTurquoise",
        fontSize: 1 + 'em',
        color: "white",
        fontWeight: 'bold',
    },

    emojiBox: {
        width: 2.5 + 'rem',
        height: 2.5 + 'rem',
    },
}
const emojiBox_selected = Object.assign({}, styling.emojiBox, {background: "DarkTurquoise"})

/*https://unicode.org/emoji/charts/full-emoji-list.html*/
const emojis = [ //U+ ==> 0x
    [
        {name: "ok_hand", code: 0x1F44C},
        {name: "astonished_face", code: 0x1F632},
        {name: "grinning_face_big_eyes", code: 0x1F603},
        {name: "thumbs_up", code: 0x1F44D},
        {name: "thinking_face", code: 0x1F914},
        {name: "brain", code: 0x1F9E0},
    ], [
        //SPECIFIC
        {name: "dizzy_face", code: 0x1F635},
        {name: "face_with_raised_eyebrows", code: 0x1F928},
        {name: "unamused_face", code: 0x1F612},
        {name: "lying_face", code: 0x1F925},
        {name: "mind_blown", code: 0x1F92F},
        {name: "face_screaming_in_fear", code: 0x1F631},
    ], [
        {name: "thumbs_down", code: 0x1F44E},
        {name: "angry_face", code: 0x1F620},
        {name: "cursing_face", code: 0x1F92C},
        {name: "nauseated_face", code: 0x1F922},
        {name: "face_vomitting", code: 0x1F92E},
    ], [
        {name: "Bullshit", code: 0x1F4A9},
        {name: "warning: SCAM!", code: 0x26A0}, //BS
    ]
]

class Rater extends React.Component {
    constructor(props) {
        super();

        this.state = {
            // rating: 0,
            // emoji_selected: false,
            contentReviews: [],
            hasReviewed: false,
            comment: null,
            emoji: null,
            title: null,
            docInfo: {
                title_guess: null
            },
            showReviewMenu: false,
        }

        this.saveReview = this.saveReview.bind(this)
    }

    saveReview() {
        const uid = auth.currentUser.uid

        api.get.user(uid)
            .then(user => {
                console.log(user, "user")
                const review = {
                    comment: this.state.comment,
                    emoji: this.state.emoji.toString(),
                    emoji_name: this.state.emoji_name,
                    title: this.state.title,
                    url: document.location.href,
                    firebaseUID: uid,
                    handle: user[0].handle,
                }

                api.set.review(review)
                    .then(res => {
                        toast(String.fromCodePoint(0x1F64C) + "    Saved!   " + String.fromCodePoint(0x1F389))
                        this.setState({showReviewMenu: false})
                    })
                    .catch(error => {
                        console.log(error, "at .get.user @ submitting review")
                    })

            })
    }

    componentDidMount() {
        api.get.reviewsWithKeyValuePair({key: "url", value: document.location.href})
            .then(reviews => {
                this.setState({contentReviews: reviews})

                //auth.currentUser
                if (true) {
                    const uid = auth.currentUser ? auth.currentUser.uid : null || "lnRuVG4hKYMJd7To0KGBkFUBEzl2"
                    const userReview = reviews.find(r => r.firebaseUID === uid);

                    //prefill state if user has review this URL before

                    if (userReview) {
                        this.setState({
                            comment: userReview.comment,
                            emoji: userReview.emoji,
                            hasReviewed: true,
                            title: userReview.title
                        })
                    }
                }
            })
            .catch(err => console.log(err, "error"))

    }


    guessDocInfo() {
        const url = document.location.href;
        api.set.docInfo(url, false)
            .then(info => this.setState({docInfo: {title_guess: info.title}}))
            .catch(err => console.log(err, "error at docinfo"))
    }

    emoji_selected(emoji_code, emoji_name) {
        console.log(emoji_code)
        this.setState({emoji: emoji_code})
        this.setState({emoji_name: emoji_name})
    }

    render() {
        return (
            <section style={styling.container}>
                <ToastContainer/>

                <div style={{background: "orange", color: "white", fontWeight: "bold", textAlign: "center"}}>
                    {this.state.contentReviews.filter(review => review.url === document.location.href).length}
                </div>

                <Button onClick={() => {
                    this.setState({showReviewMenu: !this.state.showReviewMenu});
                    this.guessDocInfo();
                }}
                        style={styling.lupa}> {this.state.showReviewMenu ? " __" : "L"}
                </Button>


                {!auth.currentUser
                    ? this.state.showReviewMenu &&
                    <div style={styling.clickBar}>LogIn (@ Extension Popup) to place an opinion</div>
                    :
                    <section
                        style={{display: this.state.showReviewMenu ? "flex" : "none", flexDirection: 'column'}}>

                        <Button style={styling.clickBar} onClick={this.saveReview}> SAVE
                            THOUGHT {String.fromCharCode(0x270C)}</Button>
                        {/*{this.state.docInfo.title_guess &&*/}
                        {/*<div>*/}
                        {/*<section style={Object.assign({}, styling.clickBar, {fontSize: 12})}>*/}
                        {/*I'm guessing <div style={{background: "Coral"}}> {this.state.docInfo.title_guess} </div> is the title?*/}
                        {/*<Button onClick={() => this.setState({title: this.state.docInfo.title_guess})}> {String.fromCodePoint(0x1F44C)} Yep</Button>*/}
                        {/*<Button onClick={() => this.setState({title: null})}> {String.fromCodePoint(0x1F44C)} Nope</Button>*/}
                        {/*</section>*/}
                        {/*</div>}*/}

                        <textarea onChange={(ev) => this.setState({comment: ev.target.value})}
                                  value={this.state.comment}
                                  placeholder={this.state.comment || `${String.fromCodePoint(0x1F449)} How do you feel about this article | video | product | whatever ? `}
                                  cols="20" rows="5"
                        />
                        <section>
                            {emojis
                                .map(emoji_category =>
                                    <section>
                                        {emoji_category.map(e =>
                                            <Button ref={e.name} data-tip={e.name}
                                                    onHover={() => ReactTooltip.show(findDOMNode(this.refs.e['name']))}
                                                    style={e.code === this.state.emoji ? emojiBox_selected : styling.emojiBox}
                                                    onClick={() => e.code === this.state.emoji ? this.setState({emoji: null}) : this.emoji_selected(e.code, e.name)}>
                                                {String.fromCodePoint(e.code)}
                                                <ReactTooltip/>
                                            </Button>
                                        )}
                                    </section>
                                )}
                        </section>
                    </section>
                }
            </section>
        )
    }
}

{
    /*<StarRatingComponent*/
}

{/*name="rate1" starCount={5}*/
}
{/*editing={true} value={this.state.rating}*/
}
{/*onStarHover={(rating) => this.state.emoji_selected ? null : this.setState({rating: rating})}*/
}
{/*onStarClick={this.onRate}*/
}
{/*/>*/
}

{/*{this.state.emoji_selected &&*/
}
{/*<button onClick={() => {*/
}
{/*this.setState({emoji_selected: false, rating: 0});*/
}
{/*}}>Reset rating for this piece*/
}
{/*</button>}*/
}

export default Rater;