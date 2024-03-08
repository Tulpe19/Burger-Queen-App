import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Burger-Queen-App';
  navBarRoutes = [
    {
      path: '/orders/create',
      id: '/orders/create',
      buttonText: 'New Order'
    },
    {
      path: ['/orders', { filter: 'pending'}],
      id: "/orders;filter=pending",
      buttonText: 'To Cook'
    },
    {
      path: ['/orders', { filter: 'delivering'}],
      id: "/orders;filter=delivering",
      buttonText: 'To Deliver'
    }
  ]

  shouldShowNavbar$: Observable<boolean>
  currentURL$: Observable<string>
  constructor(public router: Router, public authService: AuthService) {
    
    this.currentURL$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), 
      map((finalNavigation => {
        const result = (finalNavigation as NavigationEnd).urlAfterRedirects
        console.log(result)
        return result
      }))
    )

    this.shouldShowNavbar$ = this.currentURL$.pipe(map(url => !url.includes('login')))
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
