import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  displayedColumns: string[] = ['id', 'name', 'age'];
  dataSource:Employee[] = [];
  constructor(private appService:AppService){}
  ngOnInit(){
    this.appService.getAllEmployees().subscribe(employees =>
      this.dataSource = employees);
    this.empForm = new FormGroup({
      id: new FormControl("",Validators.required),
      name: new FormControl("",Validators.required),
      age: new FormControl("",Validators.required) 
    }
    );
  }
  saveEmployee(employee: Employee){
    this.appService.saveEmployee(employee).subscribe(result =>{
      console.log(result);
      
    });
    this.appService.getAllEmployees().subscribe(employees =>
      this.dataSource = employees);
  }
}
