# Playground
This project is a experimental project for mastering front end skills. 

# src
Front end developed in react. Will include re-usable react components and personal CSS framework. 

## utils
Re-usable pure functions will be saved stored here
Examples that are not robust/re-usable but useful will be stored in 'examples'

## server
Simple server for allowing reading/writing, storing information, executing commands, etc. 

Copy the following to capture api call payloads.
```
post: (payload) => {
    return fetch('http://localhost:{port}/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      method: 'POST',
      crossDomain: true
    })
      .then(resp => resp.json())
      .catch(error => console.log('error:', error));
  }
```

## testing and q.js
Folder for quick testing of html as testing javascript functions