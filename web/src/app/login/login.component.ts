import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private test: TestService) { }
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {

    this.test.getAll().subscribe(res => {
      if (res) {

      }
    })


  }

  submit() {
    if (!this.form.invalid) {
      this.test.save(this.form.value).subscribe(res => {
        if (res) {

        }
      })
    }
    else {
      console.log('please fill required fields')
    }

  }

  authenticate() {
    //https://github.com/login/oauth/authorize?client_id=e4df81b40dff70508363&redirect_uri=http://localhost:3000/oauth/redirect

    window.open('https://github.com/login/oauth/authorize?client_id=e4df81b40dff70508363&redirect_uri=http://localhost:3000/oauth/redirect', '_self');
  }

}
