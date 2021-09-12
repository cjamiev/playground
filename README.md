# Playground
Project to help with building other projects. Used for improving efficency by helping store information
and easy way to test new features. 

# sections
Home -> To do list and global timers will alerts that fire on any page. 
File -> Read files, write files, and perform string ops
Clipboard -> Store collections of copy buttons, text, timer, urls, or commands
Experiment -> Test out new functionality and components
MockServer -> Create, delete, and view mock endpoints
Generator -> Generate css

## utils
Re-usable pure functions will be saved stored here

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