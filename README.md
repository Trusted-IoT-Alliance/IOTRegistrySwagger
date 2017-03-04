# IOTRegistrySwagger

This is a RESTful API for the IOTRegistry chaincode. It was generated using Swagger, and provides for a ui for testing and debugging.

## Navigation

The key files for the API are index.js, swagger/controllers/iotregistrywareService.js, and swagger/api/swagger.yaml.

### swagger.yaml
This file defines the interface to the chaincode, specifying 
1. which functions exist
2. the parameters required to call them
3. the file in which to find the router (in this case, swagger/controllers/iotregistryware.js)
4. a specification of the response, and
5. function documentation.  

### iotregistrywareService.js
This file receives requests, formats inputs, and calls to analogue functions in index.js

### index.js
Functions in this file, called from iotregistrywareService.js, make calls to the chaincode.  


## Authors
Zaki Manian and Robert Nowell
