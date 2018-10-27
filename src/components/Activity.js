import React, {Component} from 'react';
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Container,
    Row,
    Col,
    CardGroup,
    CardBody,
    Form,
    CardFooter,
    Button,
    Card,
} from 'reactstrap';
import api from "../api";


const styling = {
    red: {
        background: "HotPink",
        color: "white",
        fontWeight: "bold",
        opacity: 0.7
    },
    cyan: {
        background: "DarkTurquoise",
        color: "white",
        fontWeight: "bold",
        opacity: 0.7
    },
    orange: {
        background: "Coral",
        color: "white",
        fontWeight: "bold",
        opacity: 0.7
    },
    emojiBox: {
        width: 2.5 + 'rem',
        height: 2.5 + 'rem',
    },
    textField: {
        // layout
        background: "#fff",
        padding: 1.125 + "em",
        borderRadius: 1 + "rem",
        boxShadow: 0.5 + "rem rgba(0, 0, 0, .3)"
    }
}

class Activity extends Component {
    goToUser(uid) {
        this.props.reviews.filter(review => review.firebaseUID === uid);
    }

    render() {
        console.log('haeyays')
        return <React.Fragment>
            <figcaption style={styling.orange}>Group: Handpicked Testies</figcaption>
            <div>
                {this.props.reviews.length < 1
                    ? <div>Loading Reviews ...</div>
                    : this.props.reviews.map(review =>
                        <section style={{display: 'flex', flexDirection: "column"}}>
                            <div key={review._id}><Button onClick={() => this.goToUser(review.firebaseUID)}
                                                          style={styling.cyan}>{review.handle + " "}</Button>
                                {" "} placed a review of {" "}


                                {review.title
                                    ? <Button style={styling.red}>{review.title}</Button>
                                    : null}

                                {" "} at <Button onClick={() => window.location.replace(review.url)}
                                                 style={styling.orange}><i>{review.url.slice(0, 30)}</i></Button>
                            </div>
                            <div style={styling.textField}>
                                <Button
                                    style={styling.emojiBox}>{review.emoji ? String.fromCodePoint(review.emoji) : null}</Button>
                                <br/>
                                <figcaption>{review.comment}</figcaption>
                            </div>
                        </section>
                    )
                }
            </div>
        </React.Fragment>
    }
}

export default Activity