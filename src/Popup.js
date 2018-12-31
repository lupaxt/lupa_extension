/*global chrome*/
import React, {Component} from 'react';
import Authentication from './Authentication/Authentication';
import {auth} from './Authentication/firebase';
import './App.css';
import About from './components/About'
import Activity from './components/Activity'
import {
    Button,
} from 'reactstrap';
import api from "./api";
import PrivacyPolicy from "./components/PrivacyPolicy";


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
                { (!this.props.user) ?
                    <Authentication/>

                    : (<React.Fragment>
                            <Button onClick={() => this.setState({view: <About/>})}>About</Button>
                            <Button onClick={() => this.setState({view: <Activity reviews={this.state.allReviews}/>})}>Activity</Button>
                            <Button onClick={() => this.setState({view: <PrivacyPolicy/>})}>Privacy</Button>
                            <Button onClick={() => auth.signOut()}>Sign Out</Button>
                            {/*<Button>Your Groups (disabled) - coming soon</Button>*/}
                        </React.Fragment>
                    )
                }
                {this.state.view}
            </div>
        );
    }
}

export default Popup;
