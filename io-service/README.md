# IO-Service
This project is primarely used to write to file.  In particular intended to be used to log api calls. 

## Add to Other projects
```
post: (payload) => {
    return fetch('http://localhost:1002/', {
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

## Potential updates
  Reading files, directories, searching files for specific text