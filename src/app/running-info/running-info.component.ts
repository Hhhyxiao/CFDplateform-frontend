import { Component, OnInit } from '@angular/core';
import { CaseService } from '../case.service';

@Component({
  selector: 'app-running-info',
  templateUrl: './running-info.component.html',
  styleUrls: ['./running-info.component.css']
})
export class RunningInfoComponent implements OnInit {

  constructor(private caseService: CaseService) { }

  ngOnInit(): void {
    this.getRunningInfo();
  }

  running: boolean = false;
  runningCase: String = "";
  runningProject: String = "";

  getRunningInfo() {
    this.caseService.getRunningInfo().subscribe(
      res => {
        if(res == null) {
          this.running = false;
        } else {
          this.runningProject = res[0];
          this.runningCase = res[1];
          this.running = true;
        }
      }
    )

  }

}
