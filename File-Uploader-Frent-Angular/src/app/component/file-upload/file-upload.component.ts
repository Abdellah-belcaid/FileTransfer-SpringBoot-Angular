import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FileService } from 'src/app/service/file.service';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  fileNames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 20 }

  @Input() users: any;


  constructor(private fileService: FileService) {

    console.log(this.users);

  }

  onUploadFiles(event: any | null): void {
    if (event) {
      let files = event.target.files;
      console.log(files);
      const formData: FormData = new FormData();
      for (const file of files) { formData.append('files', file, file.name) }
      this.fileService.uploadFile(formData).subscribe(
        event => {
          console.log(event);
          this.reportProgress(event);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  onDownloadFile(fileName: string): void {
    this.fileService.downloadFile(fileName).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }



  private reportProgress(httpEvent: HttpEvent<string[] | Blob>) {

    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'uploading ...');
        break;

      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'downloading ...');
        break;

      case HttpEventType.ResponseHeader:
        console.log('header received', httpEvent);
        break;

      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const fileName of httpEvent.body) {
            this.fileNames.unshift(fileName);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }
          ))
        }
        this.fileStatus.status = 'done';
        break;

      default:
        console.log(httpEvent);
        break;
    }
  }

  private updateStatus(loaded: number, total: number | undefined, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total!);

  }


}


