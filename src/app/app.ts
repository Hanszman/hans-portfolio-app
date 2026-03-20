import {
  Component,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

const PORTFOLIO_THEME = {
  primary: {
    strong: '#7c2d12',
    default: '#ea580c',
    neutral: '#fdba74',
  },
  secondary: {
    strong: '#581c87',
    default: '#a855f7',
    neutral: '#e9d5ff',
  },
  success: {
    strong: '#166534',
    default: '#22c55e',
    neutral: '#bbf7d0',
  },
  danger: {
    strong: '#9f1239',
    default: '#e11d48',
    neutral: '#fecdd3',
  },
  warning: {
    strong: '#9a3412',
    default: '#f97316',
    neutral: '#fdba74',
  },
  info: {
    strong: '#1d4ed8',
    default: '#3b82f6',
    neutral: '#bfdbfe',
  },
  base: {
    strong: '#431407',
    default: '#7c2d12',
    neutral: '#fed7aa',
  },
  backgroundColor: '#fff7ed',
  textColor: '#431407',
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App implements OnInit {
  protected readonly title = signal('hans-portfolio-app');

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
