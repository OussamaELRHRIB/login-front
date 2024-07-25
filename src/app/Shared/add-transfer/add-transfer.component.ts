import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddTransferService } from '../Services/add-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transfer',
  templateUrl: './add-transfer.component.html',
  styleUrls: ['./add-transfer.component.css']
})
export class AddTransferComponent {
  transferForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  returnCode: string | null = null;
  showBbanField = false;

  constructor(private fb: FormBuilder, private addTransferService: AddTransferService, private router: Router) {
    this.transferForm = this.fb.group({
      trx_id_ext: ['', Validators.required],
      sending_country: ['', Validators.required],
      iso_currency_code: ['', Validators.required],
      trx_rate: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]],
      sender_currency: ['', Validators.required],
      sender_first_name: ['', Validators.required],
      sender_city: [''],
      sender_last_name: ['', Validators.required],
      sender_adress: [''],
      sender_datebirth: [''],
      sender_birth_place: [''],
      sender_pip: [''],
      sender_pip_issue_date: [''],
      sender_tip: [''],
      sender_nationality: ['', Validators.required],
      sender_amount_sent: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]],
      sender_telephone: [''],
      sender_fees_sent: [''],
      receiver_currency: ['', Validators.required],
      receiver_first_name: ['', Validators.required],
      receiver_last_name: ['', Validators.required],
      receiver_birth_place: [''],
      receiver_adress: [''],
      receiver_datebirth: [''],
      receiver_pip: [''],
      receiver_tip: [''],
      receiver_telephone: [''],
      receiver_nationality: [''],
      receiver_amount_sent: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]],
      Code_Purpose_transf: [''],
      Canal: ['', Validators.required],
      Login: ['', Validators.required],
      settlement_amount_sent: [''],
      settlement_amount_received: [''],
      sender_amount_received: [''],
      receiver_amount_received: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]],
      trx_type: ['0', Validators.required], // Default to '0' (Cash Pick-up)
      trx_bban: [''],
      trx_bban_w: [''],
      trx_bban_m: ['']
    });

    // Initialize the showBbanField based on the default trx_type value
    this.showBbanField = this.transferForm.get('trx_type')?.value === '1';
  }

  onTransferTypeChange() {
    const trxTypeValue = this.transferForm.get('trx_type')?.value;
    this.showBbanField = trxTypeValue === '1';
  }

  AddTransfer() {
    if (this.transferForm.valid) {
      this.addTransferService.addTransfer(this.transferForm.value).subscribe(response => {
        this.handleSuccess(response);
        this.router
      }, error => {
        this.handleError(error);
      });
    } else {
      this.errorMessage = 'Please fill all mandatory fields correctly.';
    }
  }

  handleSuccess(response: any) {
    this.successMessage = `Transaction ID: ${response.trx_id_ext}, MTCN: ${response.mtcn}, Message: ${response.returnMessage}`;
    this.returnCode = response.returnCode;
    this.errorMessage = null;
    
  }

  handleError(error: any) {
    if (error.error && error.error.Error) {
      this.errorMessage = error.error.Error.map((err: any) => err.ErrorMessage).join(', ');
    } else {
      this.errorMessage = 'An unexpected error occurred';
    }
    this.successMessage = null;
    this.returnCode = error.returnCode || 'Unknown';
  }
}
