import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth-service";
import {catchError, of, tap} from "rxjs";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-config-editable',
  templateUrl: './user-config-editable.component.html',
  styleUrls: ['./user-config-editable.component.scss']
})
export class UserConfigEditableComponent implements OnInit {
  userForm: FormGroup;
  loadingUser = true;
  userID: number | undefined;
  errorMessage: string | undefined;
  constructor(private authService: AuthService, private userService: UserService, private toastrService: ToastrService) {
    this.userForm = new FormGroup(
      {
        user_username: new FormControl('', Validators.required),
        user_nickname: new FormControl('', Validators.required),
        user_email: new FormControl('', Validators.required),
        user_first_name: new FormControl('', Validators.required),
        user_last_name: new FormControl('', Validators.required),
      })
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.getUserInfoEditable().subscribe({
        next: (user: any) => {
          this.userID = user.id;
          this.userForm = new FormGroup({
            username: new FormControl({
              value: user.username,
              disabled: true
            }),
            user_nickname: new FormControl(user.nickname, Validators.required),
            user_email: new FormControl(user.email, Validators.required),
            user_first_name: new FormControl(user.first_name, Validators.required),
            user_last_name: new FormControl(user.last_name, Validators.required),
          })
          this.loadingUser = false;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  onUpdateUser(form: FormGroup) {
    const userData = JSON.stringify( {
      user_id: this.userID,
      user_nickname: form.value.user_nickname,
      user_email: form.value.user_email,
      first_name: form.value.user_first_name,
      last_name: form.value.user_last_name
    });
    this.userService.updateUser(this.userID, userData).pipe(
      catchError((error: any) => {
        this.errorMessage = error.message;
        return of(null);
      })
    ).subscribe((result:any) => {
      if (result) {
        this.toastrService.success( 'Je gegevens zijn succesvol opgeslagen!', 'Gelukt')
      }
    });
  }
}
