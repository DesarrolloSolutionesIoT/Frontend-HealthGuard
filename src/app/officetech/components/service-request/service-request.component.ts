import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import './service-request.component.css';
import {MatCard} from "@angular/material/card";
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from "@angular/common";
import {RequestServiceService} from "../../services/request-service/request-service.service";
import {Router} from "@angular/router";

Directive({
  selector: '[appAutoResize]'
})

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCard,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './service-request.component.html',
  styleUrl: './service-request.component.css'
})
export class ServiceRequestComponent implements OnInit{
  myForm: FormGroup;
  subject: string = '';
  description: string = '';
  date: string = '';
  user_id:string = '';
  cantidadItems = 0;
  myFormControl = new FormControl('', [Validators.required]);
  private maxHeight = '300px';
  constructor(private elementRef: ElementRef, private requestServiceService : RequestServiceService, private router: Router) {
    this.myForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.resize();
    this.user_id = this.router.url.split('/')[3];
    console.log(this.requestServiceService.getItems(), this.user_id)
    this.requestServiceService.getItemCount().subscribe(count => {
      this.cantidadItems = count; // Guarda la cantidad de ítems en la variable cantidadItems
    });
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement) {
    this.resize(textArea);
  }

  resize(textArea?: HTMLTextAreaElement) {
    const textarea = textArea || this.elementRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, parseInt(this.maxHeight, 10))}px`;
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    const regex = /^[0-9]*$/; // Expresión regular que valida solo números
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.slice(0, -1); // Eliminar el último carácter si no es un número
    }
  }


  onPublish() {
    this.subject = this.myForm.get('subject')?.value ?? '';
    this.description = this.myForm.get('description')?.value ?? '';
    this.date = this.myForm.get('date')?.value ?? null;
    this.date= this.formatDate();
    /*
    console.log(this.cantidadItems)
    console.log(this.subject)
    console.log(this.description)
    console.log(this.date)
    */
    this.addNewService()
  }

  formatDate(){
    const day = this.date.substring(0, 2);
    const month = this.date.substring(2, 4);
    const year = this.date.substring(4, 8);

    return `${day}/${month}/${year}`;
  }

  addNewService() {

    const newService = {
      id: this.cantidadItems++,
      first: this.subject,
      second: this.description,
      third: 'Active',
      fourth: this.date,
      publisher_id: this.user_id
    };

    this.requestServiceService.addService(newService)
      .subscribe(
        response => console.log('Nuevo servicio agregado:', response),
        error => console.error('Error al agregar el servicio:', error)
      );
  }
}
