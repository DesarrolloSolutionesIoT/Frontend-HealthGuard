import {Component} from '@angular/core';
import { MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent, MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-skill-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatDialogClose,
    MatDialogContainer,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './skill-dialog.component.html',
  styleUrl: './skill-dialog.component.css'
})
export class SkillDialogComponent {
  public skill: string = '';
  constructor(
    public dialogRef: MatDialogRef<SkillDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
