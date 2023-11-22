import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/Entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  frm:FormGroup;
  constructor(private formBuilder:FormBuilder) {

  }
  ngOnInit(): void {
    var v=Validators;
    this.frm=this.formBuilder.group({
      nameSurname:["",
        [
          v.required,
          v.maxLength(50),
          v.minLength(3)
        ]
      ],
      userName:["",
        [
          v.required,
          v.maxLength(50),
          v.minLength(3)
        ]
      ],
      telephone:["",
        [
          v.required,
          v.maxLength(10),
          v.minLength(10),
        ]
      ],
      email:["",
        [
          v.required,
          v.maxLength(250),
          v.email
        ]
      ],
      password:["",
        [
          v.required,
          v.maxLength(100),
          v.minLength(8)
        ]
      ],
      againPassword:["",
        [
          v.required,
          v.maxLength(100),
          v.minLength(8)
        ]
      ],
    },{validators:(group:AbstractControl):ValidationErrors | null=>{
      let password=group.get("password").value;
      let againPassword=group.get("againPassword").value;
      return password===againPassword ? null : {notSame:true};
    }})
  }

  submitted:boolean=false;
  get component(){
    return this.frm.controls;
  }

  onSubmit(data:User){
    this.submitted=true;
    if(this.frm.invalid)
      return ;
  }



}
