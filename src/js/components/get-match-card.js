import React from 'react';
import {Card, CardTitle, CardText, CardActions, TextField, RaisedButton, Dialog} from 'material-ui';
import request from 'superagent';

class Main extends React.Component {
    componentWillMount() {
        this.setState({showDialogConfirm: false});
    }
    getMatch() {
        request
            .post('/get-match')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                email: this.refs.email.getValue(),
                password: this.refs.password.getValue()
            }))
            .end(this.getMatchHandleRequest.bind(this));
    }

    getMatchHandleRequest = (err, res) => {
        this.setState({returnMessage: res.text});
        this.setState({showDialogConfirm: true});
    };

    closeDialog() {
        this.setState({showDialogConfirm: false});
    }
    render() {
        return (
            <div className='get-match-card'>
                <Card initiallyExpanded={true} style={{marginTop: '30px'}}>
                    <CardTitle title="Get Match" subtitle="Matches will be ready one all entries are collected"/>
                    <CardActions>
                        <TextField
                            hintText="Email" ref='email'/>
                        <TextField
                            hintText="Password"
                            ref='password'
                            type="password" />
                    </CardActions>
                    <RaisedButton label="Get Match" secondary={true} onClick={this.getMatch.bind(this)}/>
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
