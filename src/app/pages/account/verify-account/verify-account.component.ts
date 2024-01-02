import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-verify-account',
  templateUrl: 'verify-account.component.html'
})
export class VerifyAccountComponent implements OnInit {
  message: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const verificationKey = params['verificationKey'];
      if (verificationKey) {
        this.userService.validateKey(verificationKey).subscribe({
          next: (response: any) => {
            this.message = 'Je account is geverifieerd. Je kunt nu inloggen.';
          },
          error: (error: any) => {
            this.message = 'Er is een fout opgetreden tijdens de verificatie.';
          }
        });
      }
    });
  }
}
