import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogClose, MatDialogContent, MatDialogModule  } from '@angular/material/dialog';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    FileUploadModule,
    MatCardModule,
  ],
})
export class DialogModule { }
