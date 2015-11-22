import React from 'react';
import {Card, CardTitle, CardText, CardActions, TextField, RaisedButton} from 'material-ui';

class Main extends React.Component {
    render() {
        return (
            <Card initiallyExpanded={true} style={{marginTop: '30px'}}>
                <CardTitle title="SignUp" subtitle="Sign up for the gift exchange"/>
                <CardText>
                    To sign up for the gift exchange enter your email and password below.
                </CardText>
                <CardActions>
                    <TextField
                        hintText="Email" />
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password" />
                    <RaisedButton label="SignUp" primary={true}  />
                </CardActions>
            </Card>
        );
    }
}

export default Main;
