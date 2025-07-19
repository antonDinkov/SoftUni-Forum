import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from '../../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateTheme {

  constructor(private httpClient: HttpClient) { }

  create(themeName: string, postText: string) {
    
    if (!themeName || !postText) {
        throw new Error('You need to provide themeName & text');
    }
    return this.httpClient.post<Theme>(`${environment.apiUrl}/api/themes`, {themeName, postText}, {withCredentials: true})
  }

}
