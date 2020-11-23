# mock-server
Used to create mock endpoints for testing and developing front end faster without waiting for real services

## static page
Default url for UI managing the mock server is http://localhost:3002/

## features
- response object will match body, status code and headers
	- Use localStorage which loads everything in memory
	- Use file storage for larger files which will load responses only on endpoint calls. 
- conditional responses for http post depending on payload object
- configuration: 
	- Time delay to specified urls or all
	- Erroring out all responses with status 500
	- Ability to override specified urls with specified code and response
	- logging of requests
- UI for managing server:
  - viewing/editing config
	- viewing all endpoints sorted by url or search
	- delete endpoints
	- creating new endpoints (no longer needs reloading as it is saved in session)
	- seeing log of requests
	- copy and paste payload
	- Validate json button

## note
This project has been recreated without expressjs in q project. 