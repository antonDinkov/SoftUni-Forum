import { Component, inject, Input } from '@angular/core';
import { Theme } from '../../../../models';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services';

@Component({
  selector: 'app-theme-item',
  imports: [RouterLink],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css'
})
export class ThemeItem {
    @Input() theme!: Theme;

    private authService = inject(Auth);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUserId(): string | undefined {
    return this.authService.user()?._id;
  }

  isSubscribed(themeId: string): boolean {
    // For now, return false. In a real app, you'd check against user's subscriptions
    return false;
  }

  toggleSubscribe(themeId: string): void {
    // For now, just log the action. In a real app, you'd make an API call
    console.log(`Toggling subscription for theme: ${themeId}`);
  }
}
