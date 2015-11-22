import React from 'react';
import {Card, CardTitle, CardText, CardActions, TextField, RaisedButton, Dialog} from 'material-ui';
import request from 'superagent';

class Main extends React.Component {
    componentWillMount() {
        this.setState({showDialogConfirm: false});
    }
    getMatch() {
        request
            .get('/get-match')
            .end(this.getMatchHandleRequest.bind(this));
    }

    getMatchHandleRequest = (err, res) => {
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
            <div className='get-match-card'>
                <Card initiallyExpanded={true} style={{marginTop: '30px'}}>
                    <CardTitle title="Get Match" subtitle="Matches will be ready one all entries are collected"/>
                    <CardActions>
                        <TextField
                            hintText="Email" />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password" />
                    </CardActions>
                    <RaisedButton label="Get Match" secondary={true} onClick={this.getMatch.bind(this)}/>
                </Card>
                <Dialog
                    title="Your match is not ready please try again later"
                    open={this.state.showDialogConfirm}>
                    <RaisedButton label="Okay" primary={true}  onClick={this.closeDialog.bind(this)}/>
                </Dialog>
            </div>
        );
    }
}

export default Main;
