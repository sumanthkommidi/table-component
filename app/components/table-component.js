import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TableComponentComponent extends Component {
  @tracked selectedRows = new Array(this.args.data.length).fill(false);

  get numberOfRows() {
    return this.args.data.length;
  }

  get isAllSelected() {
    return this.selectedRows.every(Boolean);
  }

  get isIndeterminate() {
    if (this.selectedRows.every(Boolean) || !this.selectedRows.some(Boolean)) {
      return false;
    } else {
      return true;
    }
  }

  get numberOfRowsSelected() {
    return this.selectedRows.filter(Boolean).length;
  }

  @action selectRow(rowNumber) {
    const selectedRowsCopy = [...this.selectedRows];
    selectedRowsCopy[rowNumber] = !selectedRowsCopy[rowNumber];
    this.selectedRows = selectedRowsCopy;
  }

  @action handleSelectAll() {
    if (this.selectedRows.every(Boolean)) {
      this.selectedRows = new Array(this.numberOfRows).fill(false);
    } else if (this.selectedRows.some(Boolean)) {
      this.selectedRows = new Array(this.numberOfRows).fill(true);
    } else {
      this.selectedRows = new Array(this.numberOfRows).fill(true);
    }
  }

  @action downloadSelectedFiles() {
    const files = this.args.data.filter(
      (item, index) => this.selectedRows[index] && item.status === 'available',
    );
    const pathAndDevice = files.map((item) => `${item.path} ${item.device}`);
    let alertText;
    if (files.length === 0) {
      alertText = 'No Files to Download';
    } else {
      alertText = pathAndDevice.join('\n');
    }

    alert(alertText);
  }
}
