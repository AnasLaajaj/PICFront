import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role';
import { UserService } from './user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roleChoosen: Role;
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  users: any[] = [];
  roles: Role[];
  errorTable: string;
  edit = false;
  user : any;

  compareRole = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  constructor(private userService: UserService,
    private roleService: RoleService, private authService: AuthService, private fb: FormBuilder, private message: NzMessageService) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],

      email: ['', [Validators.email, Validators.required]],
      role: ['', [Validators.required]],
      id:Number,
    });
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe((data) => this.roles = data);
    this.userService.getUsers().subscribe((data) => this.users = data);
  }

  showModal() {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;
    this.isVisible = false;

    setTimeout(() => {
      this.isVisible = false;
    }, 30);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    //here 01/03/2019

    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();

    }
    if(!this.edit){
    this.roleService.getRole(value.role).subscribe((role) => {
    this.signupInfo = new SignUpInfo(
      value.name,
      value.username,
      value.email,
      value.password,
      role), this.authService.signUp(this.signupInfo).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        },
      )
    });
  }
  if(this.edit){
  this.userService.save(value).subscribe((data) => console.log(data));
  }


  }

  delete(id: number) {
    this.userService.deleteUser(id)
      .subscribe((data) => {
        console.log(data), this.users = this.users
          .filter(d => d.id !== id);
        ; this.message.create('success', `Utilisateur supprimé`);
      },
        reponse => { this.errorTable = reponse.error.message; console.log(this.errorTable) });

  }
eddit(user: any){
    this.edit = true;
this.showModal();
this.user = user;

  }

}
