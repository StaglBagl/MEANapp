import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: String;
	username: String;
	email: String;
	password: String;
	
	constructor(
	  private validateService: ValidateService,
	  private authService: AuthService,
	  private _flashMessagesService: FlashMessagesService,
	  private router: Router
	) {}
	
	ngOnInit() {
	}	

	onRegisterSubmit(){
		const user = {
			name: this.name,
			email: this.email,
			username: this.username,
			password: this.password
		}

		// Required Fields
		if (!this.validateService.validateRegister(user)){
	  	  this._flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout:3000});
		  return false;
		}

		// Validate Email
		if (!this.validateService.validateEmail(user.email)){
	  	  this._flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout:3000});
		  return false;
		}

		// Register user
		this.authService.registerUser(user).subscribe(data => {
		  if(data.success){
		    this._flashMessagesService.show('You are now registered and can now log in', {cssClass: 'alert-success', timeout:3000});
			this.router.navigate(['/login']);
		  } else {
		    this._flashMessagesService.show('Something went wrong', {cssClass: 'alert-success', timeout:3000});
			this.router.navigate(['/register']);
		  }
		});
	}
}