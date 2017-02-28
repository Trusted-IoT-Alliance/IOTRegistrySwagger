module.exports = require('protobufjs').newBuilder({})['import']({
    "package": null,
    "messages": [
        {
            "name": "RegisterThingTX",
            "fields": [
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "Nonce",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "type": "string",
                    "name": "Identities",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "OwnerName",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "Signature",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Data",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Spec",
                    "id": 6
                }
            ]
        },
        {
            "name": "RegisterIdentityTX",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "OwnerName",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "PubKey",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "Signature",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Data",
                    "id": 3
                }
            ]
        },
        {
            "name": "RegisterSpecTX",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SpecName",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "OwnerName",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "Signature",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Data",
                    "id": 4
                }
            ]
        }
    ]
}).build();