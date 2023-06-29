import { Component, Input } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-password-record',
  templateUrl: './password-record.component.html',
  styleUrls: ['./password-record.component.css']
})
export class PasswordRecordComponent {
  @Input() odd: boolean = false;
  editIcon = faPenToSquare;
  trashIcon = faTrashCan;
  
}
