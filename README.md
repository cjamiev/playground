# Playground
This project is just for fun and educational purposes.  Its used for the following:
- Experimenting: Testing out a new framework or library without the constraints of a practical use case. 
- Snippets: Storage for code such as utility functions, css snippets for re-use in any other project. 
- Prep: Place to practice and study for future interviews.

## File Structure
```
|-- frontend/
|   |-- vanilla-app/
|   |-- react-app/
|-- backend/
|   |-- java-template
|-- e2e/
|-- database/
|-- other/
|-- experiment/
|-- q.js
```

## Usage
Frontend projects will be inside frontend/ but separated by framework
Backend projects similariy will be inside backend/
Database projects will be in database/
e2e projects will be in e2e/ folder
For quick testing the file q.js is used and for a bit more with TDD experiment/ is used
Anything that doesn't fit in the above category will be stored in other/

### vanilla-app
- Storage for CSS and HTML Snippets
- Utility javascript functions

### react-app
- Template for most common react features useContext, useEffect, useRef, etc.

### java-template
- Template for common Java work.

### svg-creator
This script will convert tmp/input.svg -> tmp/svg/**.js hence converts svg to react components. 

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
