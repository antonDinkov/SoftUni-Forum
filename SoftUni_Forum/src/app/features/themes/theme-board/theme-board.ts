import { Component } from '@angular/core';
import { ThemeItem } from '../theme-item/theme-item';
import { Observable } from 'rxjs';
import { Theme } from '../../../models';
import { ThemesService } from '../../../core/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-board',
  imports: [ThemeItem, CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard {
    themes$: Observable<Theme[]>;

    constructor (private themesService: ThemesService) {
        this.themes$ = this.themesService.getThemes();
    };
}
