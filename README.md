# Playground

For experimenting

## utils

Re-usable pure functions will be stored here

## server

Simple node server for allowing reading/writing, storing information, executing commands, etc.

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

## q.js

For quick testing of javascript code run 'node q.js'

## experiment

Folder for quick testing, experimenting of code, and some examples.

## SVG Components

Step 1: Create objects

- In one file <name>-canvas.svg
- Check all sizes are relatively correct

Step 2: Id the objects

- Set id with component-<name> for objects that should be a react component
- Set id with subcomponent-<name> for objects that should be a subcomponent
- Set id with condition-<name> for conditional objects in groups
- Set id with remove-<name> for extraneous objects in groups
- Set id with element-<name> for convenience

Step 3: Clean up objects

- Copy over to <name>-template.svg objects that are ready or redone
- Place items in correct positions
- Collapse related objects in the same position.
- Ungroup and re-group to remove transformations on groups

Step 4: Convert to React Components

- Copy content to experiment/example.svg
- Run node experiment/svgCreator.js or npm run script
- Search for prexisting translate and scale (redo previous steps to remove them)

## ToDo

SvgCreator:

- Clean up code
- Add more unit tests

Project:

- Add Wizard for using Template {{(variable-name):(type):(options)}}
- Delete operation for Snippet/Template

Generator:

- Flex/Grid
- Neomorphism, Glassmorphism, Aurora
- Add ability to change width of generator div
- SVG Animator
- Animation: position, scale, filters, rotation, opacity
- Background Image Gradient Form
- Default Values on Form load
- Other attributes: Visibility (visible/hidden), cursor (pointer/text), overflow (auto/hidden)
  font-weight (normal, bolder, bolder, lighter), text-decoration, font family
- Move Remove Attribute dropdown to it's own section

Dropdown:

- Pass different content
- Show on hover

Config Page:

- Set theme and update app with theme

Table:

- Sort
- Config (add/remove columns)
- Export to csv

Wizard:

- CSS for header, footer
- Progress Item List

Form Validation Hook

Package Tab:

- Notified when a script finished

Unit Test:

- InfoButton needs test
- Snippet more coverage
- server/\*\*
