import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CaseService } from '../case.service';
import { Case } from '../model/case';
import { Project } from '../model/project';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService,
    private caseService: CaseService, 
    private fb: FormBuilder,
    private notify: NzNotificationService,
    private modal: NzModalService) {}

  projects: Project[] = [];
  subProjectByProject: Map<String, Array<Case>> = new Map();
  validateForm: FormGroup;
  isVisible = false;
  isSubmitting = false;
  projectSubmitted: string;
  

  ngOnInit(): void {
    this.getProjects();
    this.validateForm = this.fb.group({
      projectName: ["", [Validators.required]]
    });
  }

  getProjects(): void{
    this.projectService.getAllProjects().subscribe(projects => 
      this.projects = projects
    );
  }

  close() {
    this.isVisible = false;
  }
  cancel(): void {
  }

  delete(projectName: string): void {
    this.projectService.deleteProject(projectName).subscribe(
      _ => {
        this.getProjects();
        this.notify.create("success", "成功删除！", "");
      },
      error => {
        const errorModal = this.modal.error({
          nzTitle: '错误',
          nzContent: "删除失败"
        });
        setTimeout(() => errorModal.destroy(),3000);   
      }
    );
  }

  show() {
    this.isVisible = true;
  }

  submit() {
    this.isSubmitting = true;
    this.projectService.createProject(this.validateForm.value.projectName).subscribe(
      _ => {
        this.isSubmitting = false;
        this.notify.create("success", "成功创建！", "");
        this.validateForm.controls["projectName"].reset();
        for(let key in this.validateForm.controls) {
          this.validateForm.controls[key].markAsPristine();
          this.validateForm.controls[key].updateValueAndValidity();
        }
        this.getProjects();
        this.close();
      },
      error => {
        this.isSubmitting = false; 
        const errorModal = this.modal.error({
          nzTitle: '错误',
          nzContent: "名字重复或不合规范"
        });
        setTimeout(() => errorModal.destroy(),3000);   
      }
    );
  }

}
