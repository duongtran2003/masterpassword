import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
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

  editIcon = faPenToSquare;
  trashIcon = faTrashCan;
  editRecord(): void {
    this.onEditClick.emit("placeholder@mock.gov");
  }
  deleteRecord(): void {
    this.onDeleteClick.emit("placeholder@mock.gov");
  }
}
