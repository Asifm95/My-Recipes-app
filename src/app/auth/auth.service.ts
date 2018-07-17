import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app'
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null
  constructor( public afAuth:AngularFireAuth, public toast:ToastrService, 
    private router: Router, private route: ActivatedRoute) { 

    this.afAuth.authState.subscribe((data) => {
      this.authState = data
    })
  }

  get authenticated():boolean{
    return this.authState !== null
  }

  get currentUserId():any{
    return this.authenticated ? this.authState.uid : null
  }


  login(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    

  logout(){
    this.afAuth.auth.signOut()
    this.router.navigate(['../'], { relativeTo: this.route });
    this.toast.success('Logged out successfully', 'Success')


  }
}
