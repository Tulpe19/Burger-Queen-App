import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  credentialValidatorForm(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = '*Credentials are invalid!';
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response: boolean) => {
        console.log('response', response)
        this.router.navigate(['/orders', { id: 1 }])
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage = 'Debe proporcionar un correo electrónico y una contraseña.';
        } else if (error.status === 404) {
          this.errorMessage = 'Credenciales incorrectas. Verifique su correo electrónico y contraseña.';
        } else {
          this.errorMessage = 'Error desconocido. Por favor, inténtelo de nuevo.';
        }
      }
    });

  };
  
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

}


