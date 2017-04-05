# IOTRegistrySwagger

This is a RESTful API for the IOTRegistry chaincode. It was generated using Swagger, and provides for a ui for testing and debugging.


## Setup

This API allows for interaction with a live blockchain through a convenient user interface in order to perform IOT related blockchain registration. Thus, it is required that a live instance of hyperledger v.6 is available to the swagger. To set up an instance of hyperledger:

1. Create an amazon ubuntu instance, and add it to an appropriate hyperledger security group.

2. Setup Docker and Docker-compose

        https://docs.docker.com/engine/getstarted/linux_install_help/

        https://docs.docker.com/compose/install/

3. Setup hypledger

    https://github.com/IBM-Blockchain/fabric-boilerplate#setting-up-hyperledger-fabric

Part of this setup process will involve setting up registration on hyperledger with a virtual machine. There are two curl commands relevant to this:
```
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{
  \"enrollId\": \"test_user0\",
  \"enrollSecret\": \"MS9qrN8hFjlE\"
}" "http://<vm_identifier>:7050/registrar"
```
vm_identifier should be updated based on the identifier of the vm being used.

The second relevant curl command deploys the chaincode:
```
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{
  \"jsonrpc\": \"2.0\",
  \"method\": \"deploy\",
  \"params\": {
    \"type\": 1,
    \"chaincodeID\": {
\"path\": \"https://github.com/Trusted-IoT-Alliance/IOTRegistry\"    },
    \"ctorMsg\": {
      \"function\": \"init\",
      \"args\": [\"\"]
    },
    \"secureContext\": \"test_user0\"
  },
  \"id\": 0
}" "http://<vm_identifier>:7050/chaincode"
```

4. Clone the IOTRegistrySwagger repository.

5. run the following command: 
```
npm install
```

6. Copy the chaincode name. To find the chaicode name, run the command sudo docker ps -a on the virtual machine running hyperledger after running the second curl command.

<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/ps-a.png" 
alt="main" border="10"/>

The chaincode name is what follows the second dash, highlighted in the image above.

7. Update IOTRegistrySwagger/examples/config.js to reflect the newly deployed chaincode name. Run the following command:

env.sh \<machine_name> \<chaincode_name>


8. Run the command 

```
node swagger
```

9. Navigate to localhost:8082/docs

## Usage

<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/swagger.png" 
alt="main" border="10"/>

This is the swagger user interface. There are nine commands.  

Three are for generating signatures:  

1. createRegistrantSig 
2. generateRegisterThingSig 
3. generateRegisterSpecSig 

There are three for registering a type to the ledger:

1. createRegistrant  
2. registerThing  
3. registerSpec  

And there are three commands for querying the ledger:

1. registrant  
2. thing  
3. spec  
  
  
Here is a brief description of each different type of registration:

1. Create a registrant  
    This allows for the user to put an "RegistrantPubkey: \<pubkey>" state to the ledger. A registrant is an entity that has control over things on the ledger.
2. Register a thing  
    A thing is an iot device. It can include a set of aliases of its registrant, which allows for the thing to be connected to multiple names shared by the same owner.
3. Register a spec  
    A spec or specification is a specific description of a thing with pertinent information about the thing.

Next let's go through a sample registration and query for registrant, thing, and spec. In order to register a thing or a spec, an registrant must first be registered.  

### Registrant

First, create a createRegistrantSig. With the fields filled in, click "try it out". A successful result looks like the following:  
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/createRegistrantSig.png" 
alt="main" border="10"/>
Copy the signature in response body. This is used for createRegistrant, at the top of the swagger ui page.  

Fill in the appropriate fields and click "try it out". A successful result looks like the following:  
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/createRegistrant.png" 
alt="main" border="10"/>
  
To check that the registrant has in fact been registered, we query the ledger:
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/registrantQuery.png" 
alt="main" border="10"/>

### Thing

First, create a registerThingSig. With the fields filled in, click "try it out". A successful result looks like the following:  
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/thingSig.png" 
alt="main" border="10"/>
Copy the signature in response body. This is used for registerThing, located towards the top of the swagger ui page.  

Things are indexed by nonces, and a nonce must be a valid, lowercase hex string. Fill in the appropriate fields and click "try it out". A successful result looks like the following:  
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/thingRegister.png" 
alt="main" border="10"/>
  
To check that the thing has in fact been registered, we query the ledger:
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/thingQuery.png" 
alt="main" border="10"/>

### Spec

First, create a registerSpecSig. With the fields filled in, click "try it out". A successful result looks like the following:  
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/specSig.png" 
alt="main" border="10"/>
Copy the signature in response body. This is used for registerSpec, located towards the top of the swagger ui page.  

Fill in the appropriate fields and click "try it out". A successful result looks like the following:  
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/specRegister.png" 
alt="main" border="10"/>
  
To check that the spec has in fact been registered, we query the ledger:
<img src="https://github.com/Trusted-IoT-Alliance/IOTRegistrySwagger/blob/master/images/specQuery.png" 
alt="main" border="10"/>


## Authors
Zaki Manian and Robert Nowell
