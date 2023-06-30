import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faClipboard, faPenToSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-password-record',
  templateUrl: './password-record.component.html',
  styleUrls: ['./password-record.component.css']
})
export class PasswordRecordComponent {

  @Input() index!: number;
  @Input() info: {
    site: string,
    email: string,
    password: string,
  } = {
      site: "",
      email: "",
      password: "",
    }
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();

  hasError: boolean = false;
  editIcon = faPenToSquare;
  trashIcon = faTrashCan;
  copyIcon = faClipboard;
  checkIcon = faSquareCheck;
  editInput: string = "";
  isEditVisible: boolean = false;
  onInput(val: string) {
    this.editInput = val;
  }
  showEditRecord(): void {
    this.isEditVisible = !this.isEditVisible;
  }
  editRecord(): void {
    let newInfo = {
      site: this.info.site,
      email: this.info.email,
      password: this.editInput
    }
    this.editInput = "";
    this.isEditVisible = !this.isEditVisible;
    this.onEditClick.emit(newInfo);
  }
  deleteRecord(): void {
    this.onDeleteClick.emit(this.info);
  }
}
