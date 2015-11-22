import React from 'react';
import SignUpCard from 'components/signup-card';
import GetMatchCard from 'components/get-match-card';
import {CardMedia, CardTitle} from 'material-ui';

class Main extends React.Component {
    componentWillMount() {
        this.state = {

        }
    }
    render() {
        return (
            <div className='main-content'>
                <CardMedia>
                    <img src="Secret_Santa1.gif"/>
                </CardMedia>
                <SignUpCard />
                <GetMatchCard />
            </div>
        );
    }
}

export default Main;
