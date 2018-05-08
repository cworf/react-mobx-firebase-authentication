import { observable, action } from 'mobx';

class DataStore {
  @observable eventsCol = {};
  @observable clients = {};
  @observable venues = {};
  @observable inventory = {};
  @observable orders = {};
  @observable conflicts = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setData = data => {
    this.eventsCol = data[0];
    this.clients = data[1];
    this.venues = data[2];
    this.inventory = data[3];
    this.orders = data[4];
    this.conflicts = data[5];
  }
}

export default DataStore;
