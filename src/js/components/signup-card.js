import React from 'react';
import {Card, CardTitle, CardText, CardActions, TextField, RaisedButton, Dialog} from 'material-ui';
import request from 'superagent';

class Main extends React.Component {
    componentWillMount() {
        this.setState({showDialogConfirm: false});
    }
    signUp() {
        request
            .post('/sign-up')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                name: this.refs.name.getValue(),
                email: this.refs.email.getValue(),
                password: this.refs.password.getValue()
            }))
            .end(this.signUpHandleRequest.bind(this));
    }

    signUpHandleRequest = (err, res) => {
        this.setState({returnMessage: res.text});
        this.setState({showDialogConfirm: true});
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
                            hintText="Name" ref='name' />
                        <TextField
                            hintText="Email" ref='email' />
                        <TextField
                            hintText="Password"
                            type="password"
                            ref='password'/>
                    </CardActions>
                    <RaisedButton label="SignUp" secondary={true}  onClick={this.signUp.bind(this)}/>
                </Card>
                <Dialog
                    title={this.state.returnMessage}
                    open={this.state.showDialogConfirm}>
                    <RaisedButton label="Okay" primary={true}  onClick={this.closeDialog.bind(this)}/>
                </Dialog>
            </div>
        );
    }
}

export default Main;
