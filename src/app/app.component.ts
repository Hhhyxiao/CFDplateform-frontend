import { Component } from '@angular/core';
import { Project } from './model/project';
import { ProjectService } from './project.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private projectService: ProjectService) {}
  projects: Project[] = [];
  title = 'Tour of Heroes';
  ngOnInit(): void {
    this.getProjects();
  }
  getProjects(): void{
    this.projectService.getAllProjects().subscribe(projects => 
      this.projects = projects
    );
  }
}