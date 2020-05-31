import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
    providedIn: 'root',
})

export class AppService {
    constructor(private http:HttpClient){}

    getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:8080/getAllEmployees");
    }

    saveEmployee(employee:Employee): Observable<any>{
        return this.http.post<any>("http://localhost:8080/saveEmployee",employee);
    }
}