import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { Privilege } from './privilege';
import { Role } from './role';
import {Router} from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  privileges: Privilege[] = [];
  roles: Role[] =[];
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  edit = false;
  privilegesChoosen: Privilege[] ;

  constructor(private roleService:RoleService,private router:Router,private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      id : Number,
      name : ['',Validators.required],
      privilegesChoosen: ['',Validators.required]
    });
   }

  ngOnInit() {
this.roleService.getPrivileges().subscribe((data) => this.privileges = data);
this.roleService.getRoles().subscribe((data) => this.roles = data);
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  handleOk(): void {
    this.isOkLoading = true;
    this.edit = false;
    this.isVisible = false;



    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 30);
  }

  showModal(): void {
    this.isVisible = true;
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
   
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();

    }
    console.log(value.privilegesChoosen);
  this.roleService.save(new Role(value.name,value.privilegesChoosen)).subscribe((data) => {console.log(data);this.handleCancel();this.roles.push(data)});
  }
}
