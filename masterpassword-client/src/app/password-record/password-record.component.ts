import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faClipboard, faPenToSquare, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-password-record',
  templateUrl: './password-record.component.html',
  styleUrls: ['./password-record.component.css']
})
export class PasswordRecordComponent implements OnInit {

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
  cancelIcon = faSquareXmark;
  editInput: string = "";
  isEditVisible: boolean = false;
  isDeleteVisible: boolean = false;

  constructor(private clipboard: Clipboard, private toast: ToastService) {}
  ngOnInit(): void {
    console.log("rendered");
  }
  onInput(val: string) {
    this.editInput = val;
  }
  deleteConfirmationToggle(): void {
    this.isDeleteVisible = !this.isDeleteVisible;
  }
  showEditRecord(): void {
    this.toast.showToast(['toastr', 'toastr-success'], "test");
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
  copyPassword(): void {
    this.clipboard.copy(this.info.password);
  }
}
