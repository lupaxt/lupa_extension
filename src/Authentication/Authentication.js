import React, {Component} from 'react'
// import * as auth from './auth';
import api from '../api'
import {auth} from './firebase';
import isEmpty from 'is-empty';
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
            hasHandle: false,
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
        this.checkHandle = this.checkHandle.bind(this)

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
        api.fiba.loginUser({userEmail: that.state.email, password: that.state.password})
            .then(user => {
                console.log("DATA FROM login", user)
                that.setState({
                    modalTitle: "You're not a stranger anymore",
                    modalBody: "You can now vote, provoke, comment on articles on the web",
                    showModal: "true",
                })

                api.get.user(user.user.uid)
                    .then(user => console.log("USER FROM BACKEND", user))
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

    setHandle(handle) {
        const that = this;

        api.set.handle(handle)
            .then(function (handle) {
                that.setState({
                    modalTitle: "Success " + handle,
                    modalBody: `Hey, thanks for using my app.
                                            Go join a group of thinkers. 
                                            Whenever you come across an article (url) 
                                            that somebody in the group rated or commented you
                                            can see what they think about it.
                                            (After you vote of course, to avoid group bias)
                                `,
                    showModal: "true",
                    hasHandle: true,
                })
            })
            .catch(function (error) {
                that.setState({
                    modalTitle: "That won't work",
                    modalBody: error.message,
                    showModal: "true",
                });
            });
    }

    async RegisterSubmitted() {
        const that = this;

        let matchedHandle;
        try {
            matchedHandle = await api.get.handle(this.state.handle);
        } catch (e) {
            console.log(e)
            return
        }
        if (!isEmpty(matchedHandle)) {
            console.log('canceled register')
            that.setState({
                modalTitle: "This Handle is Taken",
                modalBody: "Pick another handle",
                showModal: "true",
            });
            return;
        }
        auth.createUserWithEmailAndPassword(that.state.email, that.state.password)
            .then(authUser => {
                console.log('auth user', authUser)
                const firebaseUID = authUser.user.uid;
                api.set.saveUserBackend({userEmail: that.state.email, firebaseUID, handle:this.state.handle})
                    .then(res => that.setState({currentView: that.getHandleView()}))
                    .catch(err => "User was created in Firebase but not in our backend")
            })
            .catch(err => {
                console.log(err, " from update profile")
                that.setState({
                    modalTitle: "Error",
                    modalBody: err.message,
                    showModal: "true",
                });
            })
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
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Your unique Handle" autoComplete="handle"
                                                   onChange={(ev) => this.setState({handle: ev.target.value})}
                                            />
                                            <Button color="primary" className="px-4" block
                                                    onClick={this.checkHandle}>Check if free
                                            </Button>
                                            {/*<Button color="primary" className="px-4" block*/}
                                            {/*onClick={this.setHandle}>Submit*/}
                                            {/*</Button>*/}
                                            {/*<div>Handle is {this.state.isHandleFree ? "free :-)" : "taken :-("}</div>*/}
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

    checkHandle() {
        if (this.state.handle.indexOf('-') > -1) {
            this.setState({
                modalTitle: "Error",
                modalBody: "Usernames cannot contain hyphens (-)",
                showModal: "true",
            });
        }
        else {
            console.log(isEmpty([]), 'isempty check')
            api.get.handle(this.state.handle)
                .then(res => {
                    console.log(this, isEmpty(res), res);
                    this.setState({isHandleFree: isEmpty(res)})
                    this.setState({
                        modalTitle: "Handle is",
                        modalBody: isEmpty(res) ? "FREE ;-)" : "TAKEN :-(",
                        showModal: "true",
                    });
                })
                .catch(err => console.log("Handle something not free or error", err))
        }

    }

    //
    // getHandleView() {
    //     return (
    //         <div className="app flex-row align-items-center">
    //             <InputGroup className="mb-3">
    //                 <InputGroupAddon addonType="prepend">
    //                     <InputGroupText>@</InputGroupText>
    //                 </InputGroupAddon>
    //                 <Input type="text" placeholder="Your unique Handle" autoComplete="handle"
    //                        onChange={(ev) => this.setState({handle: ev.target.value})}
    //                 />
    //                 <Button color="primary" className="px-4" block
    //                         onClick={this.checkHandle}>Check if free
    //                 </Button>
    //                 <Button color="primary" className="px-4" block
    //                         onClick={this.setHandle}>Submit
    //                 </Button>
    //                 <div>Handle is {this.state.isHandleFree ? "free :-)" : "taken :-("}</div>
    //             </InputGroup>
    //         </div>
    //     )
    // }

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

export default Authentication;