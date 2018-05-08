import { observable, action } from 'mobx';

class DataStore {
  @observable eventsCol = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setEvents = eventsCol => {
    this.eventsCol = eventsCol
  }
}

export default DataStore;
