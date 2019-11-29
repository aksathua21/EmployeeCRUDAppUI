import { Component, OnInit } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute) { }
 
  employees : any;
  id:number;

  private headers = new Headers({'content-Type':'application/json'});
  fetchData = function(){
    console.log("inside fetchData()");
    let obv = this.http.get("http://localhost:2019/api/employee/fatch")
    obv.subscribe((response)=> {
      console.log(response);
      this.employees= response;
    }
    )
  }

  deleteEmployee = function(id){
    if(confirm("Are you sure ?")){
      const url = `${"http://localhost:5555/employee"}/${id}`;
      return this.http.delete(url,{headers:this.headers}).toPromise()
        .then(()=>{
          this.fetchData()
        })
    }
  }
 
  ngOnInit() {
   this.fetchData();
  }

}
