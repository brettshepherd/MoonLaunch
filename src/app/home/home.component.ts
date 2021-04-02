import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { RedditService, RedditSearchParams } from "../services/reddit.service";

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export interface CryptoData {
  symbol: string;
  mentions: number;
  comments: number;
  score: number;
  coingecko?: string;
  posts?: { title: string; link: string }[];
}

@Component({
  selector: "app-home",
  template: `
    <div class="container">
      <!------ selections ----->
      <search-inputs
        [searchDefaults]="searchDefaults"
        (search)="search($event)"
      ></search-inputs>
      <!----------------------->

      <!-- loading -->
      <div class="example-loading-shade" *ngIf="isLoadingResults; else table">
        <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
      </div>

      <!-- table section -->
      <ng-template #table>
        <!-- filter input -->
        <mat-form-field class="filter-input">
          <mat-label>Filter</mat-label>
          <input
            matInput
            (keyup)="applyFilter($event)"
            placeholder="Ex. BOG"
            #filterInput
          />
        </mat-form-field>

        <!-- table -->
        <div class="tableCont">
          <table
            mat-table
            [dataSource]="dataSource"
            matSort
            multiTemplateDataRows
          >
            <!-- Columns -->
            <ng-container
              matColumnDef="{{ column }}"
              *ngFor="let column of columnsToDisplay"
            >
              <th mat-header-cell *matHeaderCellDef mat-sort-header>
                {{ column }}
              </th>
              <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
            </ng-container>

            <!-- expanded row content -->
            <ng-container matColumnDef="expandedRow">
              <td
                mat-cell
                *matCellDef="let element"
                [attr.colspan]="columnsToDisplay.length"
              >
                <div
                  class="expanded-detail-content"
                  [@detailExpand]="
                    element == expandedCrypto ? 'expanded' : 'collapsed'
                  "
                >
                  <h3>Reddit Posts</h3>
                  <ul class="posts-links">
                    <li *ngFor="let post of element.posts">
                      <a [href]="post.link" target="_blank">{{ post.title }}</a>
                    </li>
                  </ul>
                </div>
              </td>
            </ng-container>

            <!-- Rows -->
            <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
            <tr
              mat-row
              *matRowDef="let element; columns: columnsToDisplay"
              class="standard-row"
              [class.expanded-standard-row]="expandedCrypto === element"
              (click)="
                expandedCrypto = expandedCrypto === element ? null : element
              "
            ></tr>
            <!-- expanded row -->
            <tr
              mat-row
              *matRowDef="let row; columns: ['expandedRow']"
              class="expanded-detail-row"
            ></tr>

            <!-- Row shown when there is no matching data. -->
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="4">
                No data matching the filter "{{ filterInput.value }}"
              </td>
            </tr>
          </table>

          <mat-paginator
            [pageSizeOptions]="[5, 10, 25, 100]"
            [pageSize]="10"
          ></mat-paginator>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ["./home.component.sass"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {
  columnsToDisplay: string[] = [
    "symbol",
    "mentions",
    "comments",
    "score",
    // "coingecko",
  ];
  dataSource: MatTableDataSource<CryptoData>;

  isLoadingResults = true;

  searchDefaults: RedditSearchParams = {
    subReddit: "CryptoMoonShots",
    timeFrame: "day",
    category: "top",
  };

  expandedCrypto: CryptoData | null;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this._paginator = paginator;
    this.dataSource.paginator = this._paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this._sort = sort;
    this.dataSource.sort = this._sort;
  }

  _sort: MatSort;
  _paginator: MatPaginator;

  constructor(private redditServ: RedditService) {}

  ngOnInit() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([
      { symbol: "", mentions: 0, comments: 0, score: 0 },
    ]);
  }

  async ngAfterViewInit() {
    // fetch coingecko list
    // await this.redditServ.fetchCoinGeckoList();
    //primary search
    this.search(this.searchDefaults);
  }

  async search(e: RedditSearchParams) {
    this.isLoadingResults = true;
    const data = await this.redditServ.fetchTopPost(e);
    this.dataSource = new MatTableDataSource(data);
    this.isLoadingResults = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
