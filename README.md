# Reqwstr
![Reqwstr Preview](https://i.postimg.cc/QC8qb8GH/image.png)
```
npm i -g reqwstr
```
A web tool to debug REST APIs by sending HTTP request.  
The server uses expressjs (nodejs) while the website is just raw html & js.

# Server
```
reqwstr [-c] [--port=<port>]
```

## Getting Started
Use the `reqwstr` command alone to start the server.  
If you want custom port, use the `--port=<port>` option to set the port of the server.  

Example:
```
reqwstr
```

## Default Configuration
Use the `-c` `-conf` `-config` option to change to configuration mode.  
Use the `--port=<port>` option to change the default port of the server.  
Use `--port=d` `--port=def` `--port=default` to change default port to default (3002).  

Example:
```
reqwstr -c --port=4000
```
