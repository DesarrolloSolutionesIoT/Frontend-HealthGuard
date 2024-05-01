import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatActionList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SkillDialogComponent} from "../skill-dialog/skill-dialog.component";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatActionList,
    MatButtonModule,
    MatIcon,
    NgFor,
    MatDialogModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  public skills: string[] = ['Analista de Datos', 'Experto en Ciberseguridad'];
  firstName: string= "";
  lastName: string= "";
  email: string= "";
  phone: string= "";
  password: string= "";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

    this.firstName = "John";
    this.lastName = "Doe";
    this.email = "john.doe@example.com";
    this.phone = "123456789";
    this.password = "";
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SkillDialogComponent, {
      width: '20%',
      height: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.skills.push(result);
      }
    });
  }
}
