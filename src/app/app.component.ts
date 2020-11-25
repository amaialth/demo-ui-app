import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Employee } from './employee.model';
import { AppService } from './app.service';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { GreetComponent } from './greet.component';
import { MessagingService } from 'src/shared/MessagingService';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-499690.okta.com/oauth2/default',
  redirectUri: window.location.origin,
  clientId: '0oanm3rnqpSpxxPUN4x6'
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChildren(GreetComponent) greets: QueryList<any>;
  title = 'demo-ui-app';
  empForm: FormGroup;
  employee: Employee = new Employee();
  displayedColumns: string[] = ['id', 'name', 'age'];
  dataSource: Employee[] = [];
  laguageArray: FormArray;
  constructor(private appService: AppService, private formBuilder: FormBuilder, private oauthService: OAuthService, private msg: MessagingService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
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
      language: this.formBuilder.array([])
    });
    this.addLanguageFields();
    const claims = this.oauthService.getIdentityClaims();
    this.msg.requestPerm(claims['name']);
  }
  
  login() {
    this.oauthService.initImplicitFlow();
  }
  logout() {
    this.oauthService.logOut();
  }
  get getUserName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }
  getControls() {
    return (<FormArray>this.empForm.controls.language).controls;
  }
  getSubControls(index: number) {
    return (<FormArray>(<FormArray>this.empForm.controls.language).controls[index].get("readWriteSpeak")).controls;
  }
  printArray(parentIndex: number, childIndex: number) {
    console.log((<FormArray>(<FormArray>this.empForm.controls.language).controls[parentIndex].get("readWriteSpeak")).controls[childIndex].value);
  }
  addLanguageFields() {
    let typeGroup = this.formBuilder.group({
      speak: new FormControl(""),
      read: new FormControl(""),
      write: new FormControl("")
    })
    let lanGroup = new FormGroup({
      languageDropdown: new FormControl(""),
      readWriteSpeak: this.formBuilder.array([
        typeGroup
      ])
    });
    (<FormArray>this.empForm.controls.language).push(lanGroup);
    console.log(this.empForm);
  }

  saveEmployee(employee: Employee) {
    this.greets.forEach(greet=> console.log('Hello'));
    if(this.empForm.valid){
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

}


