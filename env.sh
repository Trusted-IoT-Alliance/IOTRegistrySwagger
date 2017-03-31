#!/bin/bash

if [ -z "$1" ] ; then
  echo "missing first argument: clustername" >&2
  exit
fi

if [ -z "$2" ] ; then
  echo "missing second argument: chaincode name" >&2
  exit
fi

if [ -z "$3" ] ; then

	export HLHOST=hl-$1.brackets.trade
	echo export IOTREGISTRY_PEER=grpc://$HLHOST:7051
	echo export IOTREGISTRY_EVENTS=grpc://$HLHOST:7053
	echo export IOTREGISTRY_MEMBERS=grpc://$HLHOST:7054

	export IOTREGISTRY_CHAINCODE_NAME=$2
	echo export IOTREGISTRY_CHAINCODE_NAME=$IOTREGISTRY_CHAINCODE_NAME
	
else


	echo export IOTREGISTRY_PEER=grpc://$1:7051
	echo export IOTREGISTRY_EVENTS=grpc://$1:7053
	echo export IOTREGISTRY_MEMBERS=grpc://$1:7054

	export IOTREGISTRY_CHAINCODE_NAME=$2
	echo export IOTREGISTRY_CHAINCODE_NAME=$IOTREGISTRY_CHAINCODE_NAME
	
fi

