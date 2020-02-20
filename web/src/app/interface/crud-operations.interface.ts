import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CrudOperations<T, ID> {
	save(t: T): Observable<T>;
	update(id: ID, t: T): Observable<T>;
	getById(id: ID): Observable<T>;
	getAll(): Observable<T[]>;
	delete(id: ID): Observable<any>;
}