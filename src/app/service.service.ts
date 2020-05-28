import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  getRows() {
    return this.http.get('https://tasksmanager-302f5.firebaseio.com/Task.json');
  }
  
  getRowsById(id) {
    this.http.get('https://tasksmanager-302f5.firebaseio.com/Task/' + id +'.json');
  }

  insertRows(data) {
    var info = JSON.stringify(data);
    return this.http.post('https://tasksmanager-302f5.firebaseio.com/Task.json', info);
  }

  updateRows(name, data) {
    var info = JSON.stringify(data);
    return this.http.put('https://tasksmanager-302f5.firebaseio.com/Task/' +name+ '.json', info);
  }

  deleteRow(id) {
    return this.http.delete('https://tasksmanager-302f5.firebaseio.com/Task/' + id +'.json');
  }

}
