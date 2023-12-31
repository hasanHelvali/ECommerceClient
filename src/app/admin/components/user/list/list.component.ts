import { Component , OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListUser } from 'src/app/contracts/user/listUser';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['userName', 'nameSurname', 'email','twoFactorEnabled','role','delete'];
  dataSource :MatTableDataSource<ListUser>=null;

  constructor(
    spinner:NgxSpinnerService,
    private userService:UserService,
    private alertify:AlertifyService,
    private dialogService:DialogService
    ) {
    super(spinner);
  }
  async ngOnInit(){
    await this.getUsers();
  }


 async getUsers(){
    this.showSpinner(SpinnerType.LineSpinFade);
    const allUsers:{totalUsersCount:number; users:ListUser[]} = await  this.userService.getAllUsers(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator? this.paginator.pageSize : 5,
      ()=>this.hideSpinner(SpinnerType.LineSpinFade),
      errorMessage=>this.alertify.message(errorMessage,{
      messageType:MessageType.Error,
      position:Position.TopRight
    }))
    this.dataSource=new MatTableDataSource<ListUser>(allUsers.users)
    this.paginator.length=allUsers.totalUsersCount;
  }
  async pageChange(){
    await this.getUsers();
  }
  assignRole(id:string){
    this.dialogService.openDialog({
      componentType:AuthorizeUserDialogComponent,
      data:id,
      options:{
        width:"750px",
      },
      afterClosed:()=>{
        this.alertify.message("Roller Başarıyla Atanmıştır.",{
          messageType:MessageType.Success,
          position:Position.TopRight
        });
      }
    });
  }
}
