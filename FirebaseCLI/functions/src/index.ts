import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { DataSnapshot } from 'firebase-functions/lib/providers/database';
admin.initializeApp();

export const addDataTimestamp = functions.database.ref('/users/{userUID}/alerts/{pushID}')
    .onCreate(
        // onCreate requires a function. Below is a function that takes two parameters
        (snapshot, context) => {

            // get what was written to Firebase
            const original = snapshot.val();

            // I think these are from the code on the line with 'addDataTimestamp'
            const pushID = context.params.pushID;
            const userUID = context.params.userUID;
            console.log(`New Alert with value ${original} and pushId ${pushID}`);

            // push a new object onto database with autogenerated id.
            // use the fancy quotes to concatenate text.
            return admin.database().ref(`users/${userUID}/timeStampedAlerts`).push({
                value: original,
                timestamp: admin.database.ServerValue.TIMESTAMP
            });
        });

