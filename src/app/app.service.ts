import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})

export class AppService {
    constructor(private firestore:AngularFirestore){}

    getAllEmployees() {
    return this.firestore.collection('Employee').snapshotChanges();
    }

    saveEmployee(employee:Employee) {
        return this.firestore.collection('Employee').doc(''+employee.id).set({...employee});
    }
}