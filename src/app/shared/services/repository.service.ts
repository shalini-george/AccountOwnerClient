import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private loaderService: LoaderService) { }

  public getData(url: string) {
    this.loaderService.display(true);
    return this.http.get(this.createCompleteRoute(url, this.envUrl.urlAddress))
    .pipe(
      finalize(() => {
        this.loaderService.display(false);
      })
    )
  }

  public create(url: string, body) {
    return this.http.post(this.createCompleteRoute(url, this.envUrl.urlAddress), body, this.generateHeaders())
  }

  public update(url: string, body) {
    return this.http.put(this.createCompleteRoute(url, this.envUrl.urlAddress), body, this.generateHeaders())
  }

  public delete(url: string) {
    return this.http.delete(this.createCompleteRoute(url, this.envUrl.urlAddress))
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }

  private createCompleteRoute(route: string, envAddress: string): string {
    return `${envAddress}/${route}`;
  }

}
