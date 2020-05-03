import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public toast: ToastrService) {}
  ngOnInit() {}

  onLogin() {
    this.auth.login().then((value) => {
      console.log(value.user.displayName);
      return this.toast.success('success');
    });
  }
}
