import React from 'react';
import {Card, CardTitle, CardText, CardActions, TextField, RaisedButton, Dialog} from 'material-ui';
import request from 'superagent';

class Main extends React.Component {
    componentWillMount() {
        this.setState({showDialogConfirm: false});
    }
    signUp() {
        request
            .get('/sign-up')
            .end(this.signUpHandleRequest.bind(this));
    }

    signUpHandleRequest = (err, res) => {
        if (!err) {
            console.log(res);
            this.setState({showDialogConfirm: true});
        }
    };

    closeDialog() {
        this.setState({showDialogConfirm: false});
    }

    render() {
        return (
            <div className='sign-up-card'>
                <Card initiallyExpanded={true} style={{marginTop: '30px'}}>
                    <CardTitle title="Sign Up" subtitle="Sign up for the gift exchange"/>
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
                    </CardActions>
                    <RaisedButton label="SignUp" secondary={true}  onClick={this.signUp.bind(this)}/>
                </Card>
                <Dialog
                    title="You have been signed up, please check back later for your match"
                    open={this.state.showDialogConfirm}>
                    <RaisedButton label="Okay" primary={true}  onClick={this.closeDialog.bind(this)}/>
                </Dialog>
            </div>
        );
    }
}

export default Main;
