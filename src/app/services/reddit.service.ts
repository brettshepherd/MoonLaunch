import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CryptoData } from "../home/home.component";

export type RedditCategories =
  | "best"
  | "hot"
  | "new"
  | "top"
  | "rising"
  | "controversial";
export type RedditTimeFrames =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year"
  | "all";
export interface RedditSearchParams {
  subReddit: string;
  timeFrame: RedditTimeFrames;
  category: RedditCategories;
}

@Injectable({
  providedIn: "root",
})
export class RedditService {
  constructor(private http: HttpClient) {}

  coinGekoList: any;

  fetchTopPost(params: RedditSearchParams): Promise<CryptoData[]> {
    const { subReddit, category, timeFrame } = params;
    const url = `https://www.reddit.com/r/${subReddit}/${category}.json?limit=100&t=${timeFrame}`;

    return this.http
      .get(url)
      .pipe(
        map((res: any) => {
          const postsData = res.data.children;

          // count and combine post data
          const countObj: { [key: string]: CryptoData } = {};

          for (let i = 0; i < postsData.length; i++) {
            const post = postsData[i];
            const symbol = this.findSymbol(post.data.title);

            if (symbol) {
              countObj[symbol] = countObj[symbol] || {
                mentions: 0,
                comments: 0,
                score: 0,
                symbol,
                posts: [],
              };

              countObj[symbol].mentions++;
              countObj[symbol].comments += post.data.num_comments;
              countObj[symbol].score += post.data.score;
              countObj[symbol].posts.push({
                title: post.data.title,
                link: post.data.url,
              });
              // if (!countObj[symbol].coingecko) {
              //   const coinGekoData = this.coinGekoList[symbol];
              //   let text = "Not Found";
              //   if (coinGekoData && coinGekoData.length) {
              //     text =
              //       coinGekoData.length > 1
              //         ? "Duplicated Found"
              //         : coinGekoData[0].id;
              //   }
              //   countObj[symbol].coingecko = text;
              // }
            }
          }

          // convert object to array and sort by mentions
          return Object.values(countObj).sort(
            (a, b) => b.mentions - a.mentions
          );
        })
      )
      .toPromise();
  }

  findSymbol(title: string): string {
    let symbol = "";

    // dollar match (most popular)
    const $match = title.match(/\$\S+\b/);

    if ($match) {
      symbol = $match[0].replace("$", "");
    }
    // try full caps search
    else {
      const capsMatch = title.match(/\b[A-Z]+[A-Z]+\b/);
      symbol = capsMatch ? capsMatch[0] : "";
    }
    return symbol.toLowerCase();
  }

  fetchCoinGeckoList(): Promise<any> {
    const url =
      "https://api.coingecko.com/api/v3/coins/list?include_platform=true";
    return this.http
      .get(url)
      .pipe(
        map((data: any[]) => {
          //convert array to object for easier searching
          if (data && data.length) {
            this.coinGekoList = {};
            data.forEach((coin) => {
              const symbol = coin.symbol.toLowerCase();
              if (!this.coinGekoList[symbol]) {
                this.coinGekoList[symbol] = [];
              }
              this.coinGekoList[symbol].push(coin);
            });
          }
        })
      )
      .toPromise();
  }
}
