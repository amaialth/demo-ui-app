import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Employee } from './employee.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-ui-app';
  empForm: FormGroup;
  employee: Employee = new Employee();
  displayedColumns: string[] = ['id', 'name', 'age','read','write','speak'];
  dataSource: Employee[] = [];
  laguageArray: FormArray;
  constructor(private appService: AppService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.appService.getAllEmployees().subscribe(data => {
      this.dataSource = data.map(employees => {
        return {
          id: employees.payload.doc.data()['id'],
          name: employees.payload.doc.data()['name'],
          age: employees.payload.doc.data()['age']
        } as Employee;
      })
    });

    this.empForm = new FormGroup({
      id: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
    });
  }
  
  saveEmployee(employee: Employee) {
    this.appService.saveEmployee(employee);
    this.appService.getAllEmployees().subscribe(data => {
      this.dataSource = data.map(employees => {
        return {
          id: employees.payload.doc.data()['id'],
          name: employees.payload.doc.data()['name'],
          age: employees.payload.doc.data()['age']
        } as Employee;

      })
    });
  }

}
