import { Component, Inject, inject } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  editUserForm:FormGroup;
constructor(private formBuilder:FormBuilder,
  private dialogRef: MatDialogRef<EditDialogComponent>, 
  @Inject(MAT_DIALOG_DATA) public data : any
  //mat dialog_data is the data that comes from app component 
  //data : user
  ){
  this.editUserForm= this.formBuilder.group({
    name:[data.name,Validators.required],
    email:[data.email,Validators.email],
    password:[data.password,Validators.required]
  })
}
cancle(){
  //this () will close the dialog box
  this.dialogRef.close();
}
saveChanges(){
  if(this.editUserForm.valid){
    //this will also close the dialog box but send edituserform data 
    //to the app compoonent as observable
    this.dialogRef.close(this.editUserForm.value)
  }
}
}
