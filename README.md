# IOTRegistrySwagger

This is a RESTful API for the IOTRegistry chaincode. It was generated using Swagger, and provides for a ui for testing and debugging.

## Usage

<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/swagger.png" 
alt="main" border="10"/>

This is the swagger user interface. There are nine commands.  

Three are for generating signatures:  

1. generateRegisterOwnerSig 
2. generateRegisterThingSig 
3. generateRegisterSpecSig 

There are three for registering a type to the ledger:

1. registerOwner  
2. registerThing  
3. registerSpec  

And there are three commands for querying the ledger:

1. owner  
2. thing  
3. spec  
  
  
Here is a brief description of each different type of registration:

1. Register an owner  
    This allows for the user to put an "Owner: \<name>" state to the ledger. An owner is an entity that has control over things on the ledger.
2. Register a thing  
    A thing is an iot device. It can include a set of aliases of its owner, which allows for the thing to be connected to multiple names shared by the same owner.
3. Register a spec  
    A spec or specification is a specific description of a thing with pertinent information about the thing.

Next let's go through a sample registration and query for owner, thing, and spec. In order to register a thing or a spec, an owner must first be registered.  

### Owner

First, create a registerOwnerSig. With the fields filled in, click "try it out". A successful result looks like the following:  
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/ownerSig.png" 
alt="main" border="10"/>
Copy the signature in response body. This is used for registerOwner, at the top of the swagger ui page.  

Fill in the appropriate fields and click "try it out". A successful result looks like the following:  
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/ownerRegister.png" 
alt="main" border="10"/>
  
To check that the owner has in fact been registered, we query the ledger:
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/ownerQuery.png" 
alt="main" border="10"/>

### Thing

First, create a registerThingSig. With the fields filled in, click "try it out". A successful result looks like the following:  
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/thingSig.png" 
alt="main" border="10"/>
Copy the signature in response body. This is used for registerThing, located towards the top of the swagger ui page.  

Things are indexed by nonces, and a nonce must be a valid, lowercase hex string. Fill in the appropriate fields and click "try it out". A successful result looks like the following:  
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/thingRegister.png" 
alt="main" border="10"/>
  
To check that the thing has in fact been registered, we query the ledger:
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/thingQuery.png" 
alt="main" border="10"/>

### Spec

First, create a registerSpecSig. With the fields filled in, click "try it out". A successful result looks like the following:  
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/specSig.png" 
alt="main" border="10"/>
Copy the signature in response body. This is used for registerSpec, located towards the top of the swagger ui page.  

Fill in the appropriate fields and click "try it out". A successful result looks like the following:  
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/specRegister.png" 
alt="main" border="10"/>
  
To check that the spec has in fact been registered, we query the ledger:
<img src="https://github.com/InternetofTrustedThings/IOTRegistrySwagger/blob/master/images/specQuery.png" 
alt="main" border="10"/>


## Authors
Zaki Manian and Robert Nowell
