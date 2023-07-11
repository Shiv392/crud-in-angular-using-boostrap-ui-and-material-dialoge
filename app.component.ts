import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
title = 'crud app';
//defining users form
userForm:FormGroup
//defining array to store all users;
users:any[]=[{
  name:'shivsoni',email:'sonishiv309@gmail.com',password:'Shiv@3923'
},{
  name:'riya soni',email:'riya123@gmail.com',password:'Riya123'
},{
  name:'aliya soni',email:'aliya123@gmail.com',password:'Aliya123'
}];
  constructor(private formBuilder:FormBuilder,
   //defing dialog ref to access dialog box 
 private dialogRef:MatDialog
    ){
   this.userForm= this.formBuilder.group({
    name:['',Validators.required],
    email:['',[Validators.email,Validators.required]],
    password:['',Validators.required]
   })
  }
    
  //adding new user to users using push()
  onSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.users.push(this.userForm.value);
      console.log('users after addng new user',this.users);
      this.userForm.reset();
      }
  }
  //deleting user by taking its index and user , rempve specified data
  //from users using splice()
  deleteUser(user:any,i:any){
console.log(i);
console.log('deleted item',user);
if(i!=-1){
  if(window.confirm('are you sure to delete user')){
    this.users.splice(i,1);
  }
}
  }

  //editing user
  editUser(user:any,index:any){
    console.log('edit user index',index);
    console.log('edit user',user);
    
    //so the main concept is, once i click on edit button 
    //it should open a edit-dialog component as a dialog box .
    //edit - dialog component will have a diffrent edit form
    
    const dialogEditUser= this.dialogRef.open(EditDialogComponent,{
      width:'500px',
      data:user
    })
    //this code will open editdialogcomponet as dialog that has width of 500px 
  //data of user
  //dialogEditUser is the data that is coming from edit-dialog component
    dialogEditUser.afterClosed().subscribe((result)=>{
      console.log('data from dialog',result);
     //change previous value with new once
     if(index!=-1){
  this.users[index]=result
     }
    })
  }

}
