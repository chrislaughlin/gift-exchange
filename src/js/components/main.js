import React from 'react';
import SignUpCard from 'components/signUp-card';
import GetMatchCard from 'components/get-match-card';
import AdminPanel from 'components/admin-panel';
import {CardMedia, CardTitle} from 'material-ui';

class Main extends React.Component {
    renderAdminPanel() {
        if (location.search === '?admin') {
            return <AdminPanel />
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
                {this.renderAdminPanel()}
            </div>
        );
    }
}

export default Main;
