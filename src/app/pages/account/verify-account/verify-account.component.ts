import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-verify-account',
  template: `
    <div *ngIf="message">{{ message }}</div>
  `
})
export class VerifyAccountComponent implements OnInit {
  message: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const verificationKey = params['verificationKey'];
      if (verificationKey) {
        this.userService.validateKey(verificationKey).subscribe({
          next: (response: any) => {
            // console.log(response);
            this.message = 'Je account is geverifieerd. Je kunt nu inloggen.';
          },
          error: (error: any) => {
            console.log(error);
            this.message = 'Er is een fout opgetreden tijdens de verificatie.';
          }
        });
      }
    });
  }
}
