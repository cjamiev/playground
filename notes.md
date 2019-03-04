# Programming

## Best Practices:

- Naming: what they do NOT how they do it

```
  Lower camel case for variables & function names
  Upper camel case for class names
  classs=noun, function=verb
  Boolean variables: start with is/has/should
  Don't use language keywords like list
  meaningful distinctions in similar/different variables
  searchable names
  static factory methods for overloaded constructor
  consistent terms one word per concept
```

- Declare variables outside loop
- Always use braces for conditions & loops
- Minimize global variables.
- Minimize arguments passed in.
- Avoid output arguments
- Check functions for side effects.
- Functions should do something or return information not both
- Exceptions over errors
- File names lowercase use letters, dashes, and periods.
- Order things in a sensible way
- SRP and DRY but no pre-optimization
- Comments will always be at the top Purpose, Details
- Vertical 400 lines, Horizontal 80 - 120
- Try/Catch block separate the internals into another function
- For complex if conditionals consider a good named function
- Test Single concept

## Javascript

#### Best Practices:

- Always initialize variables, '',{},[],(){},0,false
- Treat everything as immutable/const
- Use === for comparison
- Short: y = (x === 2 ? "yes" : "no");
- Use closures:	an inner function + variables in the outer (enclosing) function’s scope gives data privacy
- Functions should be pure

#### Concepts

- spread operator
- Closure:
  var add = (() => {
  var counter = 0;
  return () => {
  counter += 1; return counter
  }
  })();
- Event Queue: setTimeout
- currying process:breaking down function into a series of functions 
- destructuring
- Redux: Single State of Truth, Immutable State, changes use Pure functions
	Action -> Reducer -> dispatch -> store -> view


#### Functions

- String:
  length, indexOf(''), slice(S,E)
  replace(''),trim(),split(''),
  toUpper/LowerCase(),parseInt(),parseFloat()
- Number:
  Number(),isFinite(),isNaN()
- Math:
  round(),abs(),ceil(),floor()
  min/max(),random()
- Date:
  getTime()
- Arrays:
  forEach(),map(),filter(),reduce()
- local/sessionStorage:
  setItem(k,v),getItem(k),removeItem(k),clear()
- .bind .call() and .apply(): change the value of 'this', .bind returns a function


## Angular Best Practices

- All top level folders in src/app/ will be modules
- Order External, Internal, Modules, Components, Services, etc alphabeticallys
  - For functions that do http request include type at the end of the name. For example 'loginPost'
- Always include type in variables and function headers
- Toggle Classes use [Class.Class-Name]="truthy"
  - For multiple use [Class]="variable"
- Formula for id is 'componentname'-'variablename'-'counter' all lowercase
- Constructors only initialize variables data loading in ngInit
- The names of URI, Selector, Template and Styles should all be identical (without 'app')

## React Best Practices:

- Smaller Components, Less state, Lift Up State to parents
- Use React.Fragment to wrap render
- Use function + inline && for conditional rendering
- When needed -> this.setState((prevState, props)=>{return {}});
- When needed -> static propTypes = {} static defaultTypes = {}
- Use immutablility (spread syntax and Object.assign({},original,{param:'new-value'}))
- Redux, GraphQL, Context API, rxjs
- why-did-you-update
- Use function components

```
const simpleComponent = ({ children }) => (
			<div>
				{children}
			</div>
		);
```

## HTML

#### Best Practices:

- Attributes Order: 1. id, class 2. tag specific attributes 3. other - angular specific attributes/directives 4. events
- Use 'input' with type 'button' for forms and 'button' elsewhere
- Use 'for' attribute input labels
- The 'name' attribute should match the variable name in component
- For forms always include 'form' and 'fieldset' tags
- Formula for id is 'componentname-variablename-counter' all lowercase

### Syntax

Include Tags

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/styles.css">
	<title>Your Website</title>
</head>
<script src="js/scripts.js"></script>
```

Textual Tags

```
<h1>This is a h1</h1>
<p> This is a p</p>
<label> This is a label </label>
```

Semantical Tags

```
<div> This is a div </div>
<span> This is a span </span>
<header>This is a header</header>
<nav>This is a nav</nav>
<main> This is a main</main>
<section>This is a section</section>
<article>This is an article</article>
<aside>This is an aside</aside>
<footer>This is an footer</footer>
```

Seperation Tags

```
<br/>
<hr>
```

Inputs Tags

```
<input type="button" value="A button"/>
<input type="text"/>
<input type="password"/>

<input type="radio" name="radiogroup" value="Radio Button 1" />
<input type="radio" name="radiogroup" value="Radio Button 2" />

<input type="checkbox" value="Checkbox Button 1" />
<input type="checkbox" value="Checkbox Button 2" />

<textarea cols=40 rows=10>This is a text area</textarea>

<select name="selectinput">
  <option value="value1">Selection 1</option>
  <option value="value2">Selection 2</option>
</select>
```

Forms

```
<form>
  <fieldset>
    <legend>Personalia:</legend>
		<label for="name">Name:</label>
		<input id="name" type="text"><br>
    <label for="email">Email:</label>
		<input id="email" type="text"><br>
    <label for="dob">Date of birth:</label>
		<input id="dob" type="text"><br>
		<input type="submit" value="Submit">
  </fieldset>
</form>
```

Unordered List Tags

```
<ul>
  <li>List 1</li>
  <li>List 2</li>
</ul>
```

Table Tags

```
<table>
	<thead>
		<tr>
			<th>Column 1 Header</th>
			<th>Column 2 Header</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Cell 1,1</td>
			<td>Cell 1,2</td>
		</tr>
		<tr>
			<td>Cell 2,1</td>
			<td>Cell 2,2</td>
	</tbody>
</table>
```

Link Tags

```
<a href="http://www.google.com" target="_blank">This is a hyperlink</a>
<img src="smiley.gif" alt="Smiley face" height="42" width="42">
```

## CSS

#### Best Practices

Always:

- use dash naming
- organize style sheet top down
- sections for different types
- use hex codes for colors
- keep a color ref at the top
- Alphabetize the order of properties
- each property should get its own line

Rarely:

- HTML tags as selector
- Absolute positioning

Never:

- use !important
- use ids as selectors
- use inline styles
- presentation in names. Exception for helper classes, like left, right or clearfix.

## Markdown

#### Syntax

```
# heading
** bold
* italic
> blockquote
1. Order list
- Unorder List
`` code
--- horizontal
[title](https://www.example.com) Link
![alt text](image.jpg) Image
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |
```

## SQLite3

#### Command Line

- .output output.sql
- .dump
- .tables
- .headers on
- .mode column
- .exit

#### CRUD Operations

- INSERT INTO 'table' (c,) VALUES (v,)
- SELECT c, FROM 'table'
- UPDATE 'table' SET c=v WHERE condition
- DELETE FROM 'table' WHERE condition
- DROP TABLE 'table'

#### Conditions and Functions

- ORDER BY condition (ASC|DESC)
- GROUP BY condition
- AND,OR,NOT
- BETWEEN,LIKE,IN
- MIN,MAX,COUNT
- AVG,SUM
