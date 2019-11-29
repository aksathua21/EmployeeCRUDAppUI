import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http:HttpClient,private router:ActivatedRoute, private route:Router) { }
  employeeObj:object={};
  confairmationString:String = ""
  isAdded:boolean = false;
  empId:number;
  data:object={"empId":0,"firstName":"","lastName":"","gender":"","dateOfBirth":"","department":""};
  isUpdare:boolean = false;
  addOrUpdateEmployee = function(employee){
    console.log(this.isUpdare);
    if(this.isUpdare){
      this.updateEmployee(employee);
    }else{
      this.addNewEmployee(employee);
    }
  }
  addNewEmployee = function(employee){
    this.employeeObj = {
      "firstName":employee.firstName,
      "lastName":employee.lastName,
      "gender":employee.gender,
      "dateOfBirth":employee.dateOfBirth,
      "department":employee.department,
    }
    this.http.post("http://localhost:2019/api/employee/register",this.employeeObj).subscribe((response)=> {
      this.confairmationString="New employee record has been added successfully..."
    })
  }
  updateEmployee(employee){
    console.log("Inside employee component - Update function");
    this.employeeObj = {
      "firstName":employee.firstName,
      "lastName":employee.lastName,
      "gender":employee.gender,
      "dateOfBirth":employee.dateOfBirth,
      "department":employee.department,
    }
    this.isUpdare = false;
    const url =`${"http://localhost:5555/employee"}/${this.empId}`;
    this.http.put(url,this.employeeObj).toPromise().then(()=>{
      this.route.navigate(['/']);
    })
  }
  fetchDataById = function(empId){
    console.log(empId);
    //if(empId!=undefined){
      const url="http://localhost:2019/api/employee/fatch/?"+1;
      console.log(url);
      let obv = this.http.get(url)
      obv.subscribe((response)=> {
            console.log(response);
            this.data=response;
      })
      this.isUpdare = true;
   // }
  }
  ngOnInit() {
    console.log("Inside employee components.ts onInit()");
    this.empId=this.router.snapshot.params.empId;
    console.log(this.router.snapshot.params);
    this.fetchDataById(this.empId);
  }
}
