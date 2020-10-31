import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CaseService } from '../case.service';
import { Case } from '../model/case';
import { Result } from '../model/result';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  constructor(private caseService: CaseService, private route: ActivatedRoute, private fb: FormBuilder,
    private notify: NzNotificationService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.getSubProject();
    this.validateForm = this.fb.group({
      subProjectName: ["", [Validators.required]]
    });
  }

  isSubmitting = false;
  validateForm: FormGroup;
  isVisible = false;
  projectName: string;
  cases: Case[];
  results: Result[];
  isVisibleSub = false;

  showModal(subProjectName: string): void {
    this.caseService.getResults(this.projectName, subProjectName).subscribe(
      results => {
        this.results = results;
        this.isVisible = true;
      }
    )
  }

  submit() {
    this.isSubmitting = true;
    this.caseService.createCase(this.projectName, this.validateForm.value.subProjectName).subscribe(
      _ => {
        this.isSubmitting = false;
        this.notify.create("success", "成功创建！", "");
        this.validateForm.controls["subProjectName"].reset();
        for(let key in this.validateForm.controls) {
          this.validateForm.controls[key].markAsPristine();
          this.validateForm.controls[key].updateValueAndValidity();
        }
        this.getSubProject();
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

  show() {
    this.isVisibleSub = true;
  }

  close() {
    this.isVisibleSub = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getSubProject():void {
    this.projectName = this.route.snapshot.paramMap.get('name').toString();
    this.caseService.getCasesByProjectName(this.projectName).subscribe(
      cases => this.cases = cases
    )
  }
  
  execScript(caseName: string): void {
    this.caseService.execScript(this.projectName, caseName).subscribe(
      str => {
        if(str == "Already Running") {
          const errorModal = this.modal.error({
            nzTitle: '错误',
            nzContent: "已有计算进行"
          });
          setTimeout(() => errorModal.destroy(),3000);  
        } else {
          this.getSubProject();
          this.notify.create("success", "成功执行！", "");
          window.location.reload;
        }
      },
      error => {
        const errorModal = this.modal.error({
          nzTitle: '错误',
          nzContent: "执行失败或已有计算进行"
        });
        setTimeout(() => errorModal.destroy(),3000);   
      }
    );
  }

  delete(caseName: string): void {
    this.caseService.deleteCase(this.projectName, caseName).subscribe(
      _ => {
        this.getSubProject();
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

  getResult(subProjectName: string) {
    this.caseService.getResults(this.projectName, subProjectName).subscribe(
      results => this.results = results 
    )

  }

}
