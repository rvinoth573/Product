import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CrudOperations } from '../interface/crud-operations.interface';
import { catchError } from 'rxjs/operators';

export abstract class ApiService<T, ID> implements CrudOperations<T, ID> {

    constructor(
        protected http: HttpClient,
        protected baseUrl: string
    ) { }

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    }

    // const headers = new HttpHeaders()
    //   .set('Authorization', '')
    //   .set('Content-Type', 'application/json');

    // this.http.post('http://localhost:3000/ping', JSON.stringify('user'), {
    //   headers: headers
    // })
    //   .subscribe(data => {
    //     console.log(data);
    //   });

    save(t: T): Observable<T> {
        return this.http.post<T>(this.baseUrl + "/messages", JSON.stringify(t), this.httpOptions).pipe(catchError(this.errorHandler));
    }

    update(id: ID, t: T): Observable<T> {
        return this.http.put<T>(this.baseUrl + "/" + id, JSON.stringify(t), {}).pipe(catchError(this.errorHandler));
    }

    getById(id: ID): Observable<T> {
        return this.http.get<T>(this.baseUrl + "/" + id).pipe(catchError(this.errorHandler));
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.baseUrl + "/getData", this.httpOptions).pipe(catchError(this.errorHandler));
    }

    delete(id: ID): Observable<T> {
        return this.http.delete<T>(this.baseUrl + '/' + id).pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

}