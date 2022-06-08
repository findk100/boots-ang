import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from '../shared/restaurant.model';

@Component({
  selector: 'app-restaurentdash', 
  templateUrl: './restaurentdash.component.html',
  styleUrls: ['./restaurentdash.component.css']
})
export class RestaurentdashComponent implements OnInit {
  formValue!:FormGroup
  restaurentModelObj: RestaurentData= new RestaurentData
  allRestarantData:any

  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
       name:[''],
       email:[''],
       mobile:[''],
       address:[''],
       services:[''],
    })
    this.getAlldata()
  }
  // now subscribing our data
  addResto(){
    console.log(this.formValue);
    
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("restaurant records added sucessfully");
      this.formValue.reset()
      this.getAlldata() // when e post are data instance add on table
    }, 
    err=>{                   // callback function for handel the err
      alert("something wrong")
    }
    )
  }
  //get all data 
  getAlldata(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestarantData=res;
    })
  }
  // delete data 
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restaurent records deleted sucessfully")
      this.getAlldata(); // qick refresh data after delete
    })
  }
  onEditResto(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.name);
    this.formValue.controls['mobile'].setValue(data.name);
    this.formValue.controls['address'].setValue(data.name);
    this.formValue.controls['services'].setValue(data.name);
  }

}


