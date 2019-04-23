//////////////////////////////////////////////////////////////////////////////
//We'll use this in the future, commented out for the sake of test coverage.//
//////////////////////////////////////////////////////////////////////////////


/*import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {User} from "./user";


@Injectable()
export class UserListService {
  readonly baseUrl: string = environment.API_URL + 'user';
  private userUrl: string = this.baseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

}*/
