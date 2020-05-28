
import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceService]
})

export class AppComponent implements OnInit{
  rowsData: any;
  dataValues: any = [];
  dataKeys: any = [];
  insertRowData: any = {description:"", priority:"", status:"", id:""};
  isDataAdded: boolean = false;
  displayMessage: string = "";
  isUpdate: boolean = false;
  isAdd: boolean = false;

  constructor( public service: ServiceService ) { }
  
  ngOnInit() {
    this.getRows();
  }

  getRows() {
    this.dataValues = [];
    this.dataKeys = [];

    this.service.getRows().subscribe( data => {
      this.rowsData = data;
      for(let key in this.rowsData) {
        this.rowsData[key].name = key;
        this.dataValues.push(this.rowsData[key])
        this.dataKeys.push(key);
      }
    }, (err) => {
      console.log(err);
    });
  }

  insertRows() {
    this.insertRowData.id = new Date().valueOf();
    
    this.service.insertRows(this.insertRowData).subscribe( data => {
      this.displayMessage =  "Row data added successfully";
      this.isDataAdded = true;
      setTimeout(() => {
        this.isDataAdded = false;
      }, 5000);
       
      this.insertRowData.description = "";
      this.insertRowData.priority = "";
      this.insertRowData.status = "";
      this.isAdd = false;
      this.getRows();
    });
    console.log(this.insertRowData);
  }

  openDialogForUpdate(data) {
    this.isUpdate = true;
    this.insertRowData = data;
  }

  updateRows() {
    let name = this.insertRowData.name;
    let data = {};
    delete this.insertRowData.name;
    console.log(this.insertRowData);
    data = this.insertRowData;
    this.service.updateRows(name, data).subscribe(data => {
      this.displayMessage =  "Row data updated successfully";
      this.isDataAdded = true;
      setTimeout(() => {
        this.isDataAdded = false;
      }, 5000);
      this.insertRowData.description = "";
      this.insertRowData.priority = "";
      this.insertRowData.status = "";
      this.isUpdate = false;
      this.getRows();
    });
  }

  deleteRow(name) {
    if(confirm("Are you sure, you want to delete this row...")) {
      console.log("Name = ", name);
      this.service.deleteRow(name).subscribe(data => {
        this.displayMessage =  "Row data deleted successfully";
        this.isDataAdded = true;
        setTimeout(() => {
          this.isDataAdded = false;
        }, 5000);
        
        this.getRows();
      });
    }
  }

  cancel() {
    this.isUpdate = false;
    this.isAdd = false;
  }
}
