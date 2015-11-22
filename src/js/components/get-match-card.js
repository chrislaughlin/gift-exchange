import React from 'react';
import {Card, CardTitle, CardText, CardActions, TextField, RaisedButton} from 'material-ui';

class Main extends React.Component {
    render() {
        return (
            <Card initiallyExpanded={true} style={{marginTop: '30px'}}>
                <CardTitle title="Get Match" subtitle="Matches will be ready one all entries are collected"/>
                <CardActions>
                    <TextField
                        hintText="Email" />
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password" />
                    <RaisedButton label="Get Match" primary={true}  />
                </CardActions>
            </Card>
        );
    }
}

export default Main;
