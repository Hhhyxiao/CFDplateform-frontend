import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }
  public uploader:FileUploader = new FileUploader({
    url: "/api/upload/",
    method: "POST",
    itemAlias: "file"
  });
  // C: 定义事件，选择文件
  selectedFileOnChanged(event:any) {
      // 打印文件选择名称
      console.log(event.target.value);
  }
  // D: 定义事件，上传文件
  uploadFile() {
      // 上传
      this.uploader.queue[0].onSuccess = function (response, status, headers) {
          // 上传文件成功
          if (status == 200) {
              // 上传文件后获取服务器返回的数据
              let tempRes = JSON.parse(response);
          } else {
              // 上传文件后获取服务器返回的数据错误
              alert("");
          }
      };
      this.uploader.queue[0].upload(); // 开始上传
  }

}
