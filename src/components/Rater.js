import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
// import '../style.css'
// import StarRatingComponent from 'react-star-rating-component'
// import {auth} from "../Authentication/firebase";
import ReactTooltip from 'react-tooltip';
import api from '../api'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Input} from 'reactstrap'
import {InputChecks} from './InputChoice'
import {createReview} from "../apis/mutations";
import {getReviewsForTarget} from "../apis/query";
import ReviewThread from './ReviewThread'
/*TODO API
TODO DELETE RATING, ADD RATING, CHANGE RATING for URL
TODO ON RATING --> PARSE URL -->UPDATE ALL RATINGS FOR THIS URL
TODO
*/


/*   .map((review, idx) => {
           const name = review.author.name;
           return (
               <Button style={{
                   fontSize: 14,
                   border: "1px white",
                   marginTop: "3px",
                   color: "white",
                   fontWeight: 'bold',
                   background: this.buttonColors[idx % 2]
               }}
                       key={review.id}
                       ref={review.id}
                       data-tip={`${String.fromCodePoint(review.emoji)}  ${review.description}`}

                       onClick={() => ReactTooltip.show(findDOMNode(this.refs[review.id]))}
               >
                   {"@" + review.name}
               </Button>)
       }
   )*/


/*   {localreviews.length ? (<Button style={{background: "black", color: "white"}} onClick={() => {
                        for (let prop in this.refs) {
                            console.log(this.refs, "refs")
                            ReactTooltip.hide(findDOMNode(this.refs[prop]))
                        }
                    }}> [X] tooltips</Button>) : null}*/

const styling = {
    container: {
        position: 'fixed',
        bottom: 10,
        left: 10,
        padding: 0,
        maxWidth: 300 + 'px',
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

        this.buttonColors = ['blue', 'purple']

        this.state = {
            // rating: 0,
            // emoji_selected: false,
            contentReviews: [],
            hasReviewed: false,
            comment: null,
            emoji: null,
            title: null,
            showReviewMenu: false,
        }

        this.saveReview = this.saveReview.bind(this)
        this.setGroups = this.setGroups.bind(this)
    }

    async saveReview() {
        //TODO get user as prop (lupa_user)

        const {description, title, emoji, groups} = this.state
        const review = {
            description: this.state.comment,
            emoji: this.state.emoji,
            title: this.state.title,
            groups: this.state.groups,
            target: document.location.href,
            targetType: "webpage",
        }

        try {
            const rev = await createReview(review)
            toast(String.fromCodePoint(0x1F64C) + "    Saved!   " + String.fromCodePoint(0x1F389))
            this.setState({showReviewMenu: false})
        } catch (err) {
            toast("Something went wrong saving your review =(")

            console.log(err, "at .get.user @ submitting review")
        }

    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.lupa_user !== nextProps.lupa_user) {
            const data = await getReviewsForTarget(document.location.href)
            this.setState({
                contentReviews: data.reviewsForTarget
            });
        }
    }

    componentDidMount() {

        // this.setState({contentReviews: reviews})
        //
        // if (true) {
        //     const uid = this.props.uid || null;
        //     const userReview = reviews.find(r => r.firebaseUID === uid);
        //
        //     if (userReview) {
        //         this.setState({
        //             comment: userReview.comment,
        //             emoji: userReview.emoji,
        //             hasReviewed: true,
        //             title: userReview.title
        //         })
        //     }
        // }
    }


    guessDocInfo() {
        const url = document.location.href;
        api.set.docInfo(url, false)
            .then(info => this.setState({title: info.title}))
            .catch(err => console.log(err, "error at docinfo"))
    }

    emoji_selected(emoji_code, emoji_name) {
        console.log(emoji_code)
        this.setState({emoji: emoji_code})
        this.setState({emoji_name: emoji_name})
    }

    setGroups = (groups) => {
        const user = this.props.lupa_user;
        if (!user) return
        const ids = user.roles
            .filter(role => role.group)
            .filter(r => groups.includes(r.group.name))
            .map(legitRole => legitRole.group.id);
        this.setState({groups: ids})
    }

    render() {
        const localreviews = this.state.contentReviews.filter(review => review.target === document.location.href)
        return (
            <section style={styling.container}>
                <ToastContainer/>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {localreviews.map(review => <ReviewThread review={review} user={this.props.lupa_user}/>)}

                </div>
                <ReactTooltip
                    multiline={true}
                    data-offset={JSON.stringify({bottom: 10, left: 20})}
                    place={'right'}
                    type='info'/>

                <div style={{
                    background: "orange",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: 2.5 + 'rem',
                }}
                >


                    {this.state.contentReviews.filter(review => review.target === document.location.href).length}
                </div>

                <Button onClick={() => {
                    this.setState({showReviewMenu: !this.state.showReviewMenu});
                    if (!this.state.title) {
                        this.guessDocInfo();
                    }
                    // Test
                    // getReviewsForTarget(document.location.href)
                    //     .then(res => console.log('res',res))
                    //     .catch(err => console.log('err',err))

                }}
                        style={styling.lupa}> {this.state.showReviewMenu ? " __" : "L"}
                </Button>


                {!this.props.uid
                    ? this.state.showReviewMenu &&
                    <div style={styling.clickBar}>LogIn (@ Extension Popup) to place an opinion. Reload after LOGIN
                        ;)</div>
                    :
                    <section
                        style={{display: this.state.showReviewMenu ? "flex" : "none", flexDirection: 'column'}}>

                        <Button style={styling.clickBar} onClick={this.saveReview}> SAVE
                            THOUGHT {String.fromCharCode(0x270C)}</Button>

                        <section style={Object.assign({}, styling.clickBar, {fontSize: 12})}>
                            <Input type="text" placeholder={this.state.title || "Title"}
                                   onChange={(ev) => this.setState({title: ev.target.value})}/>
                            {/*<Button onClick={() => this.setState({title: null})}>No</Button>*/}
                        </section>

                        <textarea onChange={(ev) => this.setState({comment: ev.target.value})}
                                  value={this.state.comment}
                                  placeholder={this.state.comment || `${String.fromCodePoint(0x1F449)} How do you feel about this article | video | product | ... |  ? `}
                                  cols="20" rows="5"
                        />
                        {this.props.lupa_user && <InputChecks onCheck={this.setGroups}
                                                              choices={this.props.lupa_user.roles.filter(role => role.group).map(role => role.group.name)}/>}
                        {/*// : ["alpha_tester", "synbio", "evolution", "hexagon"]*/}
                        <section>
                            {emojis
                                .map(emoji_category =>
                                    <section>
                                        {emoji_category.map(e =>
                                            <Button ref={e.name} data-tip={e.name}
                                                    onHover={() => ReactTooltip.show(findDOMNode(this.refs.e['name']))}
                                                    style={e.code == this.state.emoji ? emojiBox_selected : styling.emojiBox}
                                                    onClick={() => e.code == this.state.emoji ? this.setState({emoji: null}) : this.emoji_selected(e.code, e.name)}>
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

export default Rater;