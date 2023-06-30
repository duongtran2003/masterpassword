import { Component, EventEmitter, Output } from '@angular/core';
import { faRectangleXmark, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {
  validationError: string[] = [];
  newIcon = faSquarePlus;
  cancelIcon = faRectangleXmark;
  isVisible: boolean = false;
  passwordInput: string = "";
  nameInput: string = "";
  websiteInput: string = "";
  @Output() onNewRecord = new EventEmitter();

  onWebsiteInput(val: string) {
    this.websiteInput = val;
  }
  onNameInput(val: string) {
    this.nameInput = val;
  }
  onPasswordInput(val: string) {
    this.passwordInput = val;
  }
  onNewClick(): void {
    if (!this.isVisible) {
      this.isVisible = true;
    }
    else {
      let isPassed = 1;
      this.validationError = [];
      if (!this.websiteInput) {
        this.validationError.push("Website field can't be blank");
        isPassed = 0;
      }
      if (!this.nameInput) {
        this.validationError.push("Email or Username field can't be blank");
        isPassed = 0;
      }
      if (!this.passwordInput) {
        this.validationError.push("Password field can't be blank");
        isPassed = 0;
      }
      if (isPassed) {
        this.validationError = [];
        this.onNewRecord.emit({
          site: this.websiteInput,
          email: this.nameInput,
          password: this.passwordInput
        });
        this.websiteInput = "";
        this.nameInput = "";
        this.passwordInput = "";
        this.isVisible = false;
      }
    }
  }
  onCancelClick(): void {
    if (this.isVisible) {
      this.isVisible = false;
    }
  }
}
