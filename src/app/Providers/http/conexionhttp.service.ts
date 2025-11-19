import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConexionhttpService {

  private url = 'http://192.168.1.174/api/SincronizarDatos';

  //private url = 'http://127.0.0.1:8000/api/SincronizarDatos';

  constructor(
    public http: HttpClient
  ) {
  }

  loadUsers() {
    /* let headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');*/

    return new Promise((resolve, reject) => {
      let dato = [
        {
          alpha2: 'CA',
          alpha3: 'CAN',
        },
        {
          alpha2: 'UM',
          alpha3: 'UMI',

        },
        {
          alpha2: 'US',
          alpha3: 'USA',

        }]
      this.http.post(this.url, JSON.stringify(dato)).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  /*loadUsers() {
    return new Promise((resolve, reject) => {
      let miarray: number[] = [1, 2, 3, 4, 5];
      this.http.post('this.url', {
        data: {miarray}
      });
      resolve(miarray);
    });
  }*/
  /*
  *  loadUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      let postData = {
        "name": "Customer004",
        "email": "customer004@email.com",
        "tel": "0000252525"
      }
      this.http.post(this.url, postData).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }*/
}
