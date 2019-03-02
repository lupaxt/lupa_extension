import React, {useState} from "react";

export default function AccountDetails({user}) {

    const {id, name, follows, description, email, reviews} = user;

    return <React.Fragment>
        <div>
            {name}
        </div>
        <div>{email} </div>
        <div>
            About : {description}
        </div>
        <div>
            Review Count: {reviews.length}
        </div>
    </React.Fragment>

}