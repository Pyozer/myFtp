import React, {useState} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
} from '@material-ui/core';
import styled from "styled-components"

export default function Forms() {
    const [host, setHost] = useState("10.3..146");
    const [port, setPort] = useState("4321");
    const [username, setUsername] = useState("root");
    const [password, setPassword] = useState("admin");
    const handleSubmit = (event) => {
        event.preventDefault();
        //  const client = new net.Socket();
        const client = new client();
        client.connect({port: parseInt(port), host}, (data) => {
            alert(data);
        }).on("error", (err) => {
            alert(err.message);
            throw err;
        }).on('end', () => {
            alert('Fin de session')
        }).on('data', (data) => {
            alert(data)
        })
    };

    return (
        <>

            <form onSubmit={handleSubmit}>
                <Cards className="app-form">
                    <CardContents>
                        <CardMedia
                            image="./../../public/assets/network-myFtp-logo.png"
                            title="Logo MyFTP"
                        />
                        <FormControls>
                            <InputLabel htmlFor="my-input">Host</InputLabel>
                            <Input value={host} onChange={e => setHost(e.target.value)} id="my-input"
                                   aria-describedby="my-helper-text"/>
                            <FormHelperText id="my-helper-text"> localhost </FormHelperText>
                        </FormControls>
                        <FormControls>
                            <InputLabel htmlFor="my-input">Port</InputLabel>
                            <Input value={port}
                                   onChange={e => setPort(e.target.value)}
                                   id="my-input"
                                   aria-describedby="my-helper-text"/>
                            <FormHelperText id="my-helper-text"> 2323 </FormHelperText>
                        </FormControls>
                        <FormControls>
                            <InputLabel htmlFor="my-input">Username</InputLabel>
                            <Input value={username}
                                   onChange={(user) => setUsername(user.target.value)}
                                   id="my-input"
                                   aria-describedby="my-helper-text"/>
                            <FormHelperText id="my-helper-text"> Saitama </FormHelperText>
                        </FormControls>
                        <FormControls>
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input value={password}
                                   onChange={pass => setPassword(pass.target.value)}
                                   type="password"
                                   id="my-input"
                                   aria-describedby="my-helper-text"/>
                            <FormHelperText id="my-helper-text"> password </FormHelperText>
                        </FormControls>
                    </CardContents>
                    <CardAction>
                        <Button variant="contained" type='submit' color="primary"> Connect </Button>
                    </CardAction>
                </Cards>
            </form>
        </>
    );
}
const Cards = styled(Card)`margin: 10vw;`;
const FormControls = styled(FormControl)`margin: 0 10vw;`;
const CardContents = styled(CardContent)`
display: flex;
flex-direction: column;
margin: 10vh;
`;
const CardAction = styled(CardActions)`
display: flex;
justify-content: center;
`;
