# Playground
Project to help with building other projects. Used for improving efficency by helping store information and easy way to test new features. 

## sections
- Home: To do list and global timers will alerts that fire on any page. 
- File: Read and update files, perform string ops, regex, and json ops.
- Clipboard: Store collections of copy buttons, text, timer, urls, or commands
- Git: Git operations given directory.  Switch/Delete Branches, Create/Select Stash.
- MockServer: Create, delete, and view mock endpoints
- Generator: Generate css
- Experiment: Test out new functionality/components and demo existing.

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

## scripts
node script for creating files from template, updating files with regex, and update package.json file. 

## testing and q.js
Folder for quick testing of html as testing javascript functions

## ToDo
Components:
- Cards
- Progress Item List (Wizard)
- Flex/Grid (Generator)
- Neomorphism

Hook:
- Form Validation

CSS:
- Wizard