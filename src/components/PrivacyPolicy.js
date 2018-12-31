import React, {Component} from 'react';

const PrivacyPolicy = () => (<React.Fragment>
    This Privacy Policy explains what information the Lupa Reader extension collects about you and
    why, what we do with that information, and how we handle that information.
    Lupa only collects the information it needs to make itself useful.
    The only thing that we will have that links to you personally (outside the app) will be your email address.
    <h1>What user information do we collect and where is it stored?</h1>
    <ul>
        <li>Your email to authenticate you</li>
        <li>The account password itself and (email on reset password function) is done through Firebase (a 3rd party
            auth provider)
        </li>
        <li>Your email, the handle you chose and the reviews/content you create are stored in our Database</li>
        <li>You can always delete your content and your account (right now in the Beta per email request)</li>
    </ul>
    <h1>What happens with the content I created?</h1>
    <ul>
        <li>It's stored in an online database and you can always delete it</li>
        <li>It can be parsed to add extra meta information (sentiment, category etc.)</li>
        <li>If it got flagged by other users as damaging or violent, a person might review it</li>
        <li>People in your groups can see it when they visit the exact same location (url) or their dashboard - that's
            the
            purpose off the app
        </li>
    </ul>
    <h1>Do we share your information with 3rd parties?</h1>
    <ul>
        <li>No. Some Parts of anonymized text might be parsed through some 3rd party semantic intelligence API like
            Dandelion
        </li>
    </ul>
    <h1>Additional </h1>
    <ul>
        <p>When you come to a webpage, we check if that URL has been visited by other Lupa readers. You can chose to
            see what they posted at that location. That's the main feature. In the next version you'll be able to
            activate that feature specifically. Right now it's on by default</p>
        <p>We don't send you emails (only firebase does for auth stuff), but might in the future. You can always
            unsubscribe</p>
        <p>The information Lupa believes that users post isn't about people personally, but their opinions about
            content</p>
        <p>Your information is reasonable secure -- (as secure as the weakest link between Heroku and MLab is)</p>
        <p>Whenever there are problems or your have a complaint, you can write an email to lupareader[at]gmail.com</p>
        <p>If you get bored beyond believe you can read this policy again here: https://cocokiri.github.io/lupa_privacy_policy/</p>
    </ul>


</React.Fragment>)

export default PrivacyPolicy