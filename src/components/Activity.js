import React, {Component} from 'react';
import {Button} from 'reactstrap';


const styling = {
    red: {
        background: "HotPink",
        color: "white",
        fontSize: 11,
        opacity: 0.7,
        marginLeft: 0.5 + 'em'
    },
    cyan: {
        background: "DarkTurquoise",
        color: "white",
        fontWeight: "bold",
        opacity: 0.7,
    },
    orange: {
        background: "Coral",
        color: "white",
        fontSize: 10,
        opacity: 0.7,
        marginLeft: 0.5 + 'em'
    },
    emojiBox: {
        width: 2.5 + 'rem',
        height: 2.5 + 'rem',
    },
    textField: {
        // layout
        marginLeft: 1 + 'em',
        display: 'flex',
        fontSize: 11,
        background: "#fff",
        boxShadow: 0.5 + "rem rgba(0, 0, 0, .3)"
    }
}

class Activity extends Component {
    goToUser(uid) {
        this.props.reviews.filter(review => review.firebaseUID === uid);
    }

    render() {
        return <React.Fragment>
            <figcaption style={styling.orange}>Group: Handpicked Alpha Testers</figcaption>
            {/*<button onClick={() => window.open("www.dacapo.io/lupa",'_blank')}> Watch in new tab </button>*/}
            <div>
                {this.props.reviews.length < 1
                    ? <div>Loading Reviews ...</div>
                    : this.props.reviews
                        .sort((a,b) => b.timestamp - a.timestamp)
                        .map(review =>
                        <section style={{display: 'flex', flexDirection: "column"}}>
                            <div key={review._id}><Button onClick={() => this.goToUser(review.firebaseUID)}
                                                          style={styling.cyan}>{review.handle + " "}</Button>
                                {" checked "}


                                {review.title
                                    ? <Button style={styling.red}> {" "} {review.title}</Button>
                                    : null}

                                {" "} at <Button onClick={() => window.open(review.url,'_blank')}
                                                 style={styling.orange}><i>{review.url}</i></Button>
                            </div>
                            <div style={styling.textField}>
                                <Button
                                    style={styling.emojiBox}>{review.emoji ? String.fromCodePoint(review.emoji) : null}</Button>
                                <figcaption style={{paddingLeft:1 + 'em'}}>{review.comment}</figcaption>
                            </div>
                        </section>
                    )
                }
            </div>
        </React.Fragment>
    }
}

export default Activity