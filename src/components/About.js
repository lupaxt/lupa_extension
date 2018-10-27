import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    CardBody,
    Form,
    CardFooter,
    Card,
} from 'reactstrap';

const About = () =>
    (<div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form>
                                    <h1>Good you are here. This is an experiment – Markus</h1>
                                    <p>

                                        *) Join one of our 'reader groups' -- could be just a bunch of your
                                        friends interested in the same topics. Right now there's only the Alpha Testing Group.
                                        <br/>
                                        <br/>
                                        *) When you come across an article (url, really) that was
                                        reviewed by someone in that
                                        group you'll see that on the ICON at the bottom of your screen
                                        <br/>
                                        <br/>
                                        *) I made this to connect friends and people through
                                        their real (maybe intellectual) interests and to get the most diverse
                                        inputs
                                        <br/>
                                        <br/>
                                        *) Another new idea is that all your thoughts on a content or resource won't get lost the
                                        day after in some chat feed, because the thoughts show up exactly when someone comes across the place
                                        on the web (url).
                                        <br/>
                                        <br/>
                                        *) Your efforts won't get lost with time. Time got removed from the
                                        equation!
                                        <br/>
                                        <br/>
                                        *) Data only gets stored when you submit. There is no background data
                                        processing going on otherwise (except for querying the Database if there are reviews for the URL you're at)
                                    </p>

                                </Form>
                            </CardBody>
                            <CardFooter className="p-4">
                                <Row>
                                    <Col xs="4">

                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )

// *) If you want so see/respond to their thoughts and ratings,
//                                         you have to rate too (to avoid group think).
//                                         *) If you just want to see other's opinions, you can,
//                                         but you won't be able to submit your own thoughts for this specific
//                                         piece of content (url)--even not later on.
//                                         You can also do that without signing into your account, although: Don't
//                                         be just a consumer!

export default About