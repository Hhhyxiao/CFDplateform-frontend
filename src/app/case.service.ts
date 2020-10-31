import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Case } from './model/case';
import { CaseParams } from './model/caseParams';
import { Result } from './model/result';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private http: HttpClient) { }

  getRunningInfo(): Observable<String[]> {
    return this.http.get<Array<String>>("/api/case/runningInfo");
  }

  getCasesByProjectName(name: string): Observable<Array<Case>> {
    let params = new HttpParams().append(`projectName`, name);
    return this.http.get<Array<Case>>("/api/case",{params: params});
  }

  getResults(projectName: string, subProjectName: string): Observable<Array<Result>> {
    let params = new HttpParams()
      .append(`projectName`, projectName)
      .append(`caseName`, subProjectName);
      return this.http.get<Array<Result>>("/api/case/result",{params: params});
  }

  createCase(projectName: string, subProjectName: string): Observable<Object> {
    const caseParams: CaseParams = {
      projectName: projectName,
      caseName: subProjectName,
    }
    return this.http.put("/api/case", caseParams, {responseType: 'text'});
  }

  deleteCase(projectName: string, subProjectName: string): Observable<Object> {
    let params = new HttpParams()
      .append(`projectName`, projectName)
      .append(`caseName`, subProjectName);
      return this.http.delete("/api/case",{params: params, responseType: 'text'});
  }

  execScript(projectName: string, subProjectName: string): Observable<Object> {
    const caseParams: CaseParams = {
      projectName: projectName,
      caseName: subProjectName,
    }
      return this.http.put("/api/case/execScript", caseParams, {responseType: 'text'});
  }

}