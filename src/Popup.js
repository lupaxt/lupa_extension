/*global chrome*/
import React, {Component} from 'react';
import {auth} from './Authentication/firebase';
import './App.css';
import About from './components/About'
import Activity from './components/Activity'
import {
    Button,
} from 'reactstrap';
import api from "./apis/api";
import PrivacyPolicy from "./components/PrivacyPolicy";
import {graphql_server, app} from "./endpoints";
import AccountPage from "./components/account/AccountPage";

const Groups = (props) => {
    return (
        <div>
            {props.groups
                .map(g =>
                    <div>g.name<br/><br/>
                        {g.members.map(gm =>
                            <div>{`${gm.handle}  -- contributions placed: ${gm.reviews.length}`}</div>)}
                    </div>)}
        </div>
    )
}

const newtab = (url) => {
    chrome.tabs.create({url});
    window.close()
}


const URLs = {
    //TODO ATTENTION: // maybe double
    account: app + "account",
    activity: app,
    // activity: "https://lupa.com",
}

{/* <Button
                        onClick={() => newtab(URLs.account)}>Sign In: Manage Account >>
                    </Button>*/}

class Popup extends Component {
    state = {
        view: <About/>,
        groups: [],
        allReviews: [],
    }
    componentDidMount(){
        api.get.allReviews()
            .then(reviews => {
                this.setState({allReviews: reviews})
            })
            .catch(err => {
                console.log(err, "error at get all reviews")
            })
    }
    render() {
        return (
            <div>
                { (!this.props.user)
                    ? <AccountPage />
                    : (<React.Fragment>
                            <Button onClick={() => this.setState({view: <About/>})}>About</Button>
                            <Button onClick={() => newtab(URLs.activity)}>Activity</Button>

                            {/* <Button onClick={() => this.setState({view: <Activity reviews={this.state.allReviews}/>})}>Activity</Button> */}
                            <Button onClick={() => this.setState({view: <PrivacyPolicy/>})}>Privacy</Button>
                            <Button onClick={() => auth.signOut()}>Sign Out</Button>
                            {/*<Button>Your Groups (disabled) - coming soon</Button>*/}
                            {this.state.view}

                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default Popup;
