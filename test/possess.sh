#!/bin/bash

set -e

HOST=hl-sk-j-040.brackets.trade:8081

USERAPUBK=0318b8d3f9d2889ee18dd8a48bfdb539ffff4b7498864e7071addd1edb225690e3
USERAPRIVK=dc030fcfc70a24a1086421d4fc43b927dc29c7df87e4d87a6ee2ed76cf7a75d7
USERAADDR=c535bbbf772521e84c8da4378d1b21e6a4578d37

USERBPUBK=0225e0c73e75ce512f14054d9629107b9b1365d0533248b6fb9da9987ea673dcef
USERBPRIVK=de8e3f1b60c6d147c88c976f1d45e11dbcd5f09eb06f96f226cf1a9b337003d5
USERBADDR=271e7290a25454222b556aadb61bdf832cf3d3b3

POPCODEAPUBK=0246bcbefe3cb4a848ec801b3eb13e9fedc874a53f449d9c5f57c5de7fec8823ce
POPCODEAPRIVK=13874f54991ceb3f7f0b0169fc5f48fa90b3ec27d50c762961d53b28424c1de9
POPCODEAADDR=ccd652f622d8d63127babb4c4e34f8c831136adc

POPCODEAPUBK=0297bb72d581a99abb4b006fac0403871c9ec3b54ce303d2709864752bdf867350
POPCODEAPRIVK=16f8ef102297bdf5c3fddbbf443eb7ff74ba0450b867d2d0bab6b1c826e62250
POPCODEAADDR=4f967c63925015fc9186231d739c6ad185dc0f4c



# Get Balance
echo get balance
result=$(curl -f -s -X GET --header 'Accept: application/json' "http://$HOST/v1/balance?PopcodeAddress=$POPCODEAADDR")
result=$(echo $result | sed 's/\\/\\\\\\/g')
CounterSeedStr=$(echo "console.log(JSON.parse('$result').Counter)" | node)
echo $CounterSeedStr
if [ -z "$CounterSeedStr" ] ; then
    echo Missing counter seed string
    exit
fi
echo

# Get signature for create
echo create signature
echo "http://hl-sk-j-040.brackets.trade:8081/v1/generateCreateSig?CounterSeedStr=$CounterSeedStr&Amount=10&Data=1&Type=1&PopcodeAddress=$POPCODEAADDR&CreatorPrivateKey=$USERAPRIVK"
result=$(curl -f -s -X POST \ --header 'Accept: text/html' \
"http://hl-sk-j-040.brackets.trade:8081/v1/generateCreateSig?CounterSeedStr=$CounterSeedStr&Amount=10&Data=1&Type=1&PopcodeAddress=$POPCODEAADDR&CreatorPrivateKey=$USERAPRIVK")
SIG=$(echo "console.log(JSON.parse('$result').sig)" | node)
echo signature $SIG
if [ -z "$SIG" ] ;  then
    echo "did not get signature"
    exit
fi
echo

echo "http://hl-sk-j-040.brackets.trade:8081/v1/create?PopcodeAddress=$POPCODEAADDR&Amount=10&Data=1&Type=1&CreatorPubKey=$USERAPUBK&CreatorSig=$SIG"
result=$(curl -f -s -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' \
"http://hl-sk-j-040.brackets.trade:8081/v1/create?PopcodeAddress=$POPCODEAADDR&Amount=10&Data=1&Type=1&CreatorPubKey=$USERAPUBK&CreatorSig=$SIG")
result=$(echo "console.log(JSON.parse('$result').result)" | node)

if [ -z "$result" ] ; then
    echo "missing result"
    exit
fi
echo


# Get Balance
echo get balance
result=$(curl -f -s -X GET --header 'Accept: application/json' "http://$HOST/v1/balance?PopcodeAddress=$POPCODEAADDR")
result=$(echo $result | sed 's/\\/\\\\\\/g')
CounterSeedStr=$(echo "console.log(JSON.parse('$result').Counter)" | node)
Output=$(echo "console.log(JSON.parse('$result').Outputs.length - 1)" | node)
echo Counter Seed Str $CounterSeedStr
echo Output $Output 
if [ -z "$CounterSeedStr" ] ; then
    echo Missing counter seed string
    exit
fi

if [ -z "$Output" ] ; then
    echo Missing counter seed string
    exit
fi
echo

# Generate Possess Signature
echo Generate Possess Signature
echo "http://hl-sk-j-040.brackets.trade:8081/v1/generatePossessSig?CounterSeedStr=$CounterSeedStr&Output=$Output&Data=1&NewOwnersPubKeys=$USERBPUBK&PopcodePrivateKey=$POPCODEAPRIVK"
result=$(curl -f -s -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' \
"http://hl-sk-j-040.brackets.trade:8081/v1/generatePossessSig?CounterSeedStr=$CounterSeedStr&Output=$Output&Data=1&NewOwnersPubKeys=$USERBPUBK&PopcodePrivateKey=$POPCODEAPRIVK")
SIG=$(echo "console.log(JSON.parse('$result').sig)" | node)
if [ -z "$SIG" ] ;  then
    echo "did not get signature"
    exit
fi
echo

# Possess 
echo Possess
echo "http://hl-sk-j-040.brackets.trade:8081/v1/possess?PopcodeAddress=$POPCODEAADDR&Data=1&PopcodePubKey=$POPCODEAPUBK&PopcodeSig=$SIG&NewOwnersPubKeys=$USERBPUBK&Output=$Output"
result=$(curl -s -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' \
"http://hl-sk-j-040.brackets.trade:8081/v1/possess?PopcodeAddress=$POPCODEAADDR&Data=1&PopcodePubKey=$POPCODEAPUBK&PopcodeSig=$SIG&NewOwnersPubKeys=$USERBPUBK&Output=$Output")
echo $result

