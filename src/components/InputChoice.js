import React, {useState} from "react";

const defaultGroup = "alpha_tester"

export default function InputChoice({choices = [defaultGroup], defaultChoice = defaultGroup, handleClick}) {
    const [value, setValue] = useState("")
    const [error, setError] = useState(null)
    console.log('value', value)


    const names = value.split(' ').map(e => e.toLowerCase().trim());

    const onInput = (val) => {
        const legitEntry = names.every(v => choices.includes(v))
        legitEntry ? setError(null) : setError("spell well, has to be a existing (you're part of) groupname followed by space '" +
            " ' (eg. 'synbio sfpainters hacker_z')")
        setValue(val)
    }

    return <React.Fragment><input /*placeholder={"Share into a Group: " + {defaultGroup}}*/
        defaultValue={defaultChoice}
        onChange={(ev) => onInput(ev.target.value)}/>
        {error && <span>{error}</span>}
        <button onClick={() => error || handleClick(names)}>{error ? "..." : "OK"}</button>
    </React.Fragment>
}

export class InputChecks extends React.Component{
    constructor({choices=[defaultGroup, "synbio", "xmen"], defaultChoice=defaultGroup}) {
        super();
        const st = {}
        choices.forEach(c => st[c] = false);
        this.ch = choices;
        st[defaultChoice] = true;
        this.state = st;
    }

    render() {
        return <div style={{display: "flex", flexWrap:"wrap"}}>
            {this.ch.map(choice => (
                <div> {"  "}
            <input key={choice.length + choice.codePointAt(1)}
                   type="checkbox" checked={this.state[choice]}
                   onClick={ev => this.setState({[ev.target.value]: !this.state[ev.target.value]})}
                   value={choice}/>
                    {choice}
                </div>
            ))}
            </div>
    }

}
