import { Injectable } from "@angular/core";
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService{
    currentMessage = new BehaviorSubject(null);

    constructor(private angularFirebaseMessaging: AngularFireMessaging){
    }

    requestPerm(userName){
        this.angularFirebaseMessaging.requestToken.subscribe((token)=>{
            console.log(token);
        },
        (err)=>
        {
            console.error("No Permission "+ err);
        })
    }

    receiveMessage(){

    }
}