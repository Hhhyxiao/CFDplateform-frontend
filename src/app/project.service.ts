import { Injectable } from '@angular/core';
import { Project } from './model/project';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private config: ConfigService) { }
  

  getAllProjects(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>("/api/project/all");
  }

  deleteProject(projectName: string) : Observable<Object> {
    let params = new HttpParams().append("projectName", projectName);
    return this.http.delete("/api/project", {params: params, responseType: 'text'});
  }

  createProject(projectName: string): Observable<Object> {
    return this.http.put("/api/project", projectName, {responseType: 'text'});
  }
} 
