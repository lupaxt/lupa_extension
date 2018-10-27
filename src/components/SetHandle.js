import React, {Component} from 'react'
import {auth} from './firebase';
import api from '../api'
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';



let handle = ""
const SetHandle = (props) => (
    <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder="Your unique Handle" autoComplete="handle"
               onChange={(val) => {(handle = val)}}/>
        <Button color="link" className="px-0"
                onClick={api.checkHandle(handle.toLowerCase())}>Forgot
            password?</Button>
    </InputGroup>
)
export default SetHandle;