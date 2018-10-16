import React, {Component} from 'react'
// import * as auth from './auth';
import {auth} from './firebase';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import {CardHeader, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

const INITIAL_STATE = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    previousPassword: "",
};

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.state = {
            currentView: "",
            showModal: false,
            modalTitle: "",
            modalBody: "",
            //updateStore:this.props.onChange,
        }


        this.RegisterClicked = this.RegisterClicked.bind(this);
        this.LoginClicked = this.LoginClicked.bind(this);
        this.ForgotPasswordClicked = this.ForgotPasswordClicked.bind(this);
        this.ResetPasswordClicked = this.ResetPasswordClicked.bind(this);
        this.LoginSubmitted = this.LoginSubmitted.bind(this);
        this.RegisterSubmitted = this.RegisterSubmitted.bind(this);
        this.ForgotPasswordSubmitted = this.ForgotPasswordSubmitted.bind(this);
        this.ResetPasswordSubmitted = this.ResetPasswordSubmitted.bind(this);

        this.updateEmail = this.updateEmail.bind(this)
        this.updateUsername = this.updateUsername.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.updateConfirmPassword = this.updateConfirmPassword.bind(this)
        this.updatePreviousPassword = this.updatePreviousPassword.bind(this)

        this.closeModal = this.closeModal.bind(this)
        this.goHome = this.goHome.bind(this)

    }

    componentDidMount() {
        this.setState({
            currentView: this.getLoginView()
        })
    }

    LoginClicked() {
        this.setState({
            currentView: this.getLoginView(),
        })
    }

    RegisterClicked() {
        this.setState({
            currentView: this.getRegisterView(),
        })
    }

    ForgotPasswordClicked() {
        this.setState({
            currentView: this.getForgotPasswordView(),
        })
    }

    ResetPasswordClicked() {
        this.setState({
            currentView: this.getResetPasswordView(),
        })
    }

    LoginSubmitted() {
        const that = this;
        auth.signInWithEmailAndPassword(that.state.email, that.state.password)
            .then(cbData => {
                console.log("DATA FROM login", cbData)
                that.setState({
                    modalTitle: "You're not a stranger anymore",
                    modalBody: "You can now vote, provoke, comment on articles on the web",
                    showModal: "true",
                })

                // that.props.onUpdateUserInfo(cbData);
            })
            .catch(error => {
                console.log("Error FROM login", error)
                that.setState({
                    modalTitle: "Error",
                    modalBody: error.message,
                    showModal: "true",
                });
            });

    }


    RegisterSubmitted() {
        if (this.state.username.indexOf('-') > -1) {
            this.setState({
                modalTitle: "Error",
                modalBody: "Usernames cannot contain hyphens (-)",
                showModal: "true",
            });
        }
        else {
            const that = this;
            auth.createUserWithEmailAndPassword(that.state.email, that.state.password)
                .then(authUser => {
                    const currentUserID = auth.currentUser.uid;
                    console.log(authUser, currentUserID, "ID",'authuser')

                    auth.currentUser.updateProfile({displayName: that.state.username})
                        .then(function () {
                            that.setState({
                                modalTitle: "Success",
                                modalBody: `Hey, thanks for using my app.
                                            Go join a group of thinkers. 
                                            Whenever you come across an article (url) 
                                            that somebody in the group rated or commented you
                                            can see what they think about it.
                                            (After you vote of course, to avoid group bias)
                                `,
                                showModal: "true",
                            })
                        })
                        .catch(function (error) {
                            that.setState({
                                modalTitle: "Error",
                                modalBody: error.message,
                                showModal: "true",
                            });
                        });
                })
                .catch(function (error) {
                    that.setState({
                        modalTitle: "Error",
                        modalBody: error.message,
                        showModal: "true",
                    });
                })
        }
    }

    ForgotPasswordSubmitted() {
        auth.sendPasswordResetEmail(this.state.email)
        //SUCCESS
            .then(() => {
                this.setState({
                    modalTitle: "Success",
                    modalBody: "Your password has been reset! Please check your email to get your new password.",
                    showModal: "true",
                })
                //this.state.updateStore();
            })
            // FAILURE
            .catch(error => {
                this.setState({
                    modalTitle: "Error",
                    modalBody: error.message,
                    showModal: "true",
                });
            });
    }

    ResetPasswordSubmitted() {
        let that = this;
        auth.signInWithEmailAndPassword(this.state.email, this.state.previousPassword)
            .then(function (user) {
                auth.currentUser.updatePassword(this.state.password)
                    .then(function () {
                        that.setState({
                            modalTitle: "Success",
                            modalBody: "Your password has been changed!",
                            showModal: "true",
                        });
                        //that.state.updateStore();

                    })
                    .catch(function (error) {
                        that.setState({
                            modalTitle: "Error",
                            modalBody: error.message,
                            showModal: "true",
                        });
                    })
            })
            .catch(function (error) {
                that.setState({
                    modalTitle: "Error",
                    modalBody: error.message,
                    showModal: "true",
                });
            })
    }

    updateEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    updateUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    updatePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    updateConfirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    updatePreviousPassword(event) {
        this.setState({
            previousPassword: event.target.value
        });
    }

    closeModal() {
        this.setState({
            showModal: false,
        })
    }

    goHome() {
        window.location.href = "/"
    }

    getLoginView() {
        return (
            <div className="app flex-row align-items-center" style={{minWidth: 400 + "px"}}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>@</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Email" autoComplete="email"
                                                       onChange={this.updateEmail}/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password"
                                                       autoComplete="current-password" onChange={this.updatePassword}/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4"
                                                            onClick={this.LoginSubmitted}>Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="primary" className="px-4"
                                                            onClick={this.RegisterClicked}>Register</Button>
                                                </Col>
                                                <Col xs="6">
                                                    <Button color="link" className="px-0"
                                                            onClick={this.ForgotPasswordClicked}>Forgot
                                                        password?</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0"
                                                            onClick={this.ResetPasswordClicked}>Reset Password</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Good you are here. Thank you for using my new app – Markus</h2>
                                            <p> * ) If you think: Wow a long intro text- this extension might not be your thing. It's made for readers.

                                                * ) Join one of our 'reader groups' -- could be just a bunch of your friends interested in the same topics.
                                                * ) When you come across an article (url, really) that was rated/commented by someone in that
                                                group you'll see that
                                                *) If you want so see/respond to their thoughts and ratings,
                                                you have to rate too (to avoid group think).
                                                *) If you just want to see other's opinions, you can,
                                                but you won't be able to submit your own thoughts for this specific piece of content (url)--even not later on.
                                                You can also do that without signing into your account, although: Don't be just a consumer!

                                                *) I came up with this to connect friends and people through
                                                their real (maybe intellectual) interests and to get the most diverse inputs without the
                                                usual biases that come with seeing ratings up first or wanting to conform.
                                                Another new idea is that all your thoughts on a piece won't get lost the day after in some chat feed,
                                                because the thoughts show up exactly when someone comes across the place on the web (url).
                                                Your efforts won't get lost with time. Time got abstracted out of the equation!

                                                *) Important: Something you don't explicitly rate / comment will never be recognized by the software.
                                                Data only gets stored when you submit. There is no background data processing going on otherwise.
                                            </p>
                                            <Button color="primary" className="mt-3" active
                                                    onClick={this.RegisterClicked}>Get Started!</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    getRegisterView() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="displayname" autoComplete="displayname"
                                                   onChange={this.updateUsername}/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Email" autoComplete="email"
                                                   onChange={this.updateEmail}/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" autoComplete="new-password"
                                                   onChange={this.updatePassword}/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Repeat password"
                                                   autoComplete="new-password" onChange={this.updateConfirmPassword}/>
                                        </InputGroup>
                                        <Button color="success" block onClick={this.RegisterSubmitted}>Create
                                            Account</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="4">
                                            <Button color="primary" className="px-4" block
                                                    onClick={this.LoginClicked}>Back</Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    getForgotPasswordView() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <h1>Forgot Password</h1>
                                        <p className="text-muted">Recover your password</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Email" autoComplete="email"
                                                   onChange={this.updateEmail}/>
                                        </InputGroup>
                                        <Button color="success" block
                                                onClick={this.ForgotPasswordSubmitted}>Submit</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="4">
                                            <Button color="primary" className="px-4" block
                                                    onClick={this.LoginClicked}>Back</Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    getResetPasswordView() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <h1>Reset Password</h1>
                                        <p className="text-muted">Reset your password</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Email" autoComplete="email"
                                                   onChange={this.updateEmail}/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Old Password"
                                                   autoComplete="new-password" onChange={this.updatePreviousPassword}/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="New Password"
                                                   autoComplete="new-password" onChange={this.updatePassword}/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Repeat password"
                                                   autoComplete="new-password" onChange={this.updateConfirmPassword}/>
                                        </InputGroup>
                                        <Button color="success" block
                                                onClick={this.ResetPasswordSubmitted}>Submit</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="4">
                                            <Button color="primary" className="px-4" block
                                                    onClick={this.LoginClicked}>Back</Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.currentView}
                <Modal isOpen={this.state.showModal} toggle={this.toggleSmall}
                       className={'modal-sm ' + this.props.className}>
                    <ModalHeader toggle={this.toggleSmall}>{this.state.modalTitle}</ModalHeader>
                    <ModalBody>
                        {this.state.modalBody}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeModal}>Close</Button>
                        <Button color="primary" onClick={this.goHome}>Home</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

// const mapStoreToProps = ({user}) => ({user});
// const neededActions = (store) => {
//     const {onUpdateUserInfo} = actions();
//     return {onUpdateUserInfo}
// };

export default Authentication;