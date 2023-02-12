import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from './auth-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){};
  // @ts-ignore
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken().token;
    this.authService.validateToken(token).subscribe({
      next: response => {
        return true
      },
      error: error => {
        this.router.navigateByUrl('/account/login');
        return false
      }
    });
  }
}
