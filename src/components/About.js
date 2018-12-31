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

// import comment_howto from '../assets/comment_howto.png'
import comment_howto2 from '../assets/comment_howto2.png'
import tooltip_howto from '../assets/tooltip_howto.png'

const styles = {
    imgs: {
        // maxWidth: 200 +"px",
        width: "150px"
    }
}
const About = () =>
    (<div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                <Form>
                                    <h1>Good you are here</h1>
                                    <p>
                                        *) This is about finding and discussing cool resources on the web together.
                                        Right now there's only the Alpha Testing Group.
                                        <br/>
                                        <br/>
                                    </p>
                                    {/*<div style={styles.img}>*/}
                                    {/*<img src={tooltip_howto} alt={"activity_icon_explainer"}/>*/}
                                    {/*</div>*/}
                                        <p>
                                        *) When you come across an article/content (url, really) that was
                                        reviewed by someone in that group
                                        you'll see that on the ICON at the bottom of your screen
                                        <br/>
                                        <br/>
                                        *) I made this to connect friends and people through
                                        their real (maybe intellectual) interests and to get the most diverse
                                        opinions
                                    </p>
                                    {/*<img style={styles.img} src={comment_howto2} alt={"screenshot of how to comment"}/>*/}
                                    <p>
                                        <br/>
                                        <br/>
                                        *) All your thoughts on a content show up exactly when someone comes across the
                                        place
                                        on the web (url). Unlike sharing on some platform your input won't be lost at
                                        the bottom of some chat feed the day after!
                                        <br/>
                                        <br/>
                                        *) Data only gets stored when you submit. There is no background data
                                        processing going on otherwise (except for querying the Database if there are
                                        reviews for the URL you're at)
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