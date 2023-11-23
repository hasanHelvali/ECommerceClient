import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Entities/user';
import { CreateUser } from 'src/app/contracts/user/createUser';
import { MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  frm:FormGroup;
  constructor(private formBuilder:FormBuilder,private userService:UserService,private toastrService:CustomToastrService) {

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
      passwordConfirm:["",
        [
          v.required,
          v.maxLength(100),
          v.minLength(8)
        ]
      ],
    },{validators:(group:AbstractControl):ValidationErrors | null=>{
      let password=group.get("password").value;
      let againPassword=group.get("passwordConfirm").value;
      return password===againPassword ? null : {notSame:true};
    }})
  }

  submitted:boolean=false;
  get component(){
    return this.frm.controls;
  }

  async onSubmit(user:User){
    this.submitted=true;
    if(this.frm.invalid)
      return ;
    const result : CreateUser = await this.userService.create(user)
    if(result.succeeded)
      this.toastrService.message(result.message,"Kullanıcı Kaydı Başarılı",
      {
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      });
    else
      this.toastrService.message(result.message,"Kullanıcı Kaydı Yapılamadı",
      {
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      });
  }



}
