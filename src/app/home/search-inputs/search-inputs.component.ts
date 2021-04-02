import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import {
  RedditSearchParams,
  RedditCategories,
  RedditTimeFrames,
} from "../../services/reddit.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "search-inputs",
  template: `
    <div class="controls">
      <mat-form-field class="control">
        <mat-label>Subreddit</mat-label>
        <input
          matInput
          placeholder="Ex. CryptoMoonShots"
          [(ngModel)]="subReddit"
        />
      </mat-form-field>
      <!-- categories-->
      <mat-form-field appearance="fill" class="control noFormUnderline">
        <mat-label>Category</mat-label>
        <mat-select [(ngModel)]="category">
          <mat-option *ngFor="let cat of categories" [value]="cat">
            {{ cat }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <!-- TimeFrame-->
      <mat-form-field
        appearance="fill"
        class="control noFormUnderline"
        *ngIf="category === 'top' || category === 'controversial'"
      >
        <mat-label>Time Frame</mat-label>
        <mat-select [(ngModel)]="timeFrame">
          <mat-option *ngFor="let time of timeFrames" [value]="time">
            {{ time }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <button class="mat-primary search" (click)="onSearch()">
        <i class="fas fa-search"></i>
      </button>
    </div>
  `,
  styleUrls: ["./search-inputs.component.sass"],
})
export class SearchInputsComponent {
  @Output() search = new EventEmitter<RedditSearchParams>();

  @Input() set searchDefaults(val: RedditSearchParams) {
    this.subReddit = val.subReddit;
    this.timeFrame = val.timeFrame;
    this.category = val.category;
  }

  subReddit: string;
  timeFrame: string;
  category: string;

  categories: RedditCategories[] = [
    "best",
    "hot",
    "new",
    "top",
    "rising",
    "controversial",
  ];

  timeFrames: RedditTimeFrames[] = [
    "hour",
    "day",
    "week",
    "month",
    "year",
    "all",
  ];

  onSearch() {
    this.search.emit({
      category: this.category as RedditCategories,
      subReddit: this.subReddit,
      timeFrame: this.timeFrame as RedditTimeFrames,
    });
  }
}
