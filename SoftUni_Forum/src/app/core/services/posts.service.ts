import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SidePost } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private apiUrl = 'http://localhost:3000/api/posts?limit=5'

    constructor(private httpClient: HttpClient) { }

    getPosts (): Observable<SidePost[]> {
        return this.httpClient.get<SidePost[]>(this.apiUrl);
    }
}
