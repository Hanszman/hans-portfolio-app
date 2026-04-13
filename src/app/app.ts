import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PORTFOLIO_THEME } from './core/config/portfolio-theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  ngOnInit(): void {
    (
      window as Window & {
        HansUI?: {
          setTheme?: (theme: typeof PORTFOLIO_THEME) => void;
        };
      }
    ).HansUI?.setTheme?.(PORTFOLIO_THEME);
  }
}
