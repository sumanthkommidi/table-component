import Controller from '@ember/controller';
import TABLE_DATA from '../responses/table-data';

export default class ApplicationController extends Controller {
  data = TABLE_DATA;
}
