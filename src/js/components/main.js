import React from 'react';
import SignUpCard from 'components/signUp-card';
import GetMatchCard from 'components/get-match-card';
import {CardMedia, CardTitle} from 'material-ui';

class Main extends React.Component {
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
