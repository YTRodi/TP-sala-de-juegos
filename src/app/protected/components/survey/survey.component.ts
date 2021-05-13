import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { MatDialogRef } from '@angular/material/dialog';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  public currentUser!: firebase.User;
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private dialogRef: MatDialogRef<SurveyComponent>
  ) {
    this.formGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', Validators.required],
      edad: [18, [Validators.required, Validators.min(18), Validators.max(99)]],
      numTelefono: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      preguntaUno: ['Regular', [Validators.required]],
      preguntaDos: ['', [Validators.required]],
      preguntaTres: [
        5,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

  ngOnInit(): void {}

  sendSurvey() {
    this.surveyService.saveSurvey(this.formGroup.getRawValue());
    this.dialogRef.close();
    this.formGroup.reset();
  }
}
