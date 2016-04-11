# Mentions - Email Contacts Search and Highlight

Uses the MixMax API to create a slash command integration. 

Operated by using the slash command:

> /at [Search Term]

The integration (will eventually) allow you to search your email contacts and mention them (highlight their name) to bring a specific item in the email to their attention, assign them a task, among many other use cases.

In this prototype, the integration does not yet search your contacts (which requires user authentication with GMail) but for now has a hard-coded list of contacts you can search for (common superheroes).

The search performed is a simple text match on the contact's name and email. Search matches show the contact's:

- Picture
- Name
- Email


![alt text](http://i.imgur.com/0p66Y59.png "Sample Screenshot")

When a contact is selected, the following highlight is inserted into the body of the message:

![alt text](http://i.imgur.com/ZfSVCsj.png "Sample Screenshot")

On hover over the highlight, recipients can also see the the person's email.

The code is based off of the sample code at http://sdk.mixmax.com/docs/tutorial-giphy-link-preview and calls Facebook's Graph API https://developers.facebook.com/docs/graph-api/reference/event

### Installation

```sh
$ npm install
```

```sh
$ npm start
```

### Adding the Integration

| Input Name    | Value         
| ------------- |:-------------|
| Name   | Mentions |
| Command   | at |
| Name   | Mentions |
| Parameter Placeholder   | [Search your contacts] |
| Typeahead API Url   | http://localhost:9147/typeahead |
| Resolver URL  | http://localhost:9147/resolver      |


### TODOs

* Integrate with GMail Contacts to bring up actual results
* Make highlight editable (change the text that is highlighted)
* Make highlight in-line with text (should not have to take up its own line)
* Add mentioned contact's email to Email Recipient List if not already present (MixMax SDK does not currently support this - only Subject can be altered)
* Change command from "at" to "@" (more universally familiar, but currently commands can only be alphanumeric characters)

