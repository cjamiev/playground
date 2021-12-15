# Playground
Project to help with building other projects. Used for improving efficency by helping store information and easy way to test new features. 

![Feature](./documentation/generator-screenshot.jpg)

## Application Pages & Sections
- Home: To do list and global timers will alerts that fire on any page. 
- File: Read and update files, perform string ops, regex, and json ops.
- Clipboard: Store collections of copy buttons, text, timer, urls, or commands
- Generator: Generate css
- Experiment: Test out new functionality/components and demo existing.
- Project: Git & Regex operations on a directory.
  Updating package.json and running package scripts.  
  Creating files from templates or copying saved snippets.
- Commands: list of commands to execute
- Links: list of favorite external links
- MockServer: Create, delete, and view mock endpoints
- Config: Sets what appears in Commands & Links dropdown.  Add and delete project directories

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
  - Ideally one object should be reference.
	- Check all sizes are relatively correct. 
Step 2: Id the objects
	- Set id with subcomponent-<name> for objects that should be a subcomponent
	- Set id with condition-<name> for conditional objects in groups 
	- Set id with remove-<name> for extraneous objects in groups
	- Set id with element-<name> for convenience
Step 3: Clean up objects
  - Copy over to <name>-template.svg objects that are ready or redone
  - Place items in correct positions
  - Collapse related objects in the same position. 
  - Ungroup and re-group to remove transformations on groups
	- Set id with component-<name> for grouped objects
Step 4: Convert to React Components
  - Copy content to experiment/example.svg
  - Only include information inside the primary layer grouping
	- Run node experiment/svgCreator.js
  - Search for prexisting translate and scale (redo previous steps to remove them)
Step 5: Clean up
  - create object maps for conditionals 
	- transform="translate(x,y)"

## ToDo
SvgCreator:
  - Add aria labels to components
  - Clean up code
  - Add more unit tests
  - Add to tab to Project page

Project:
  - Add Wizard for using Template {{<variable-name>:<type>:<options>}}
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
  - server/**