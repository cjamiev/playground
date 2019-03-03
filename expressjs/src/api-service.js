
class ApiService {
  constructor() {
    this.data = require('./data');
    this.missingDataMessage = 'Missing data: an id, name, date, and description is required';
    this.duplicateIdMessage = 'Data with this id already exists; ids must be unique';
    this.missingDataIdMessage = 'Missing data: an id is required';
    this.idDoesNotExistMessage = 'No exists with this id';
    this.serverErrorMessage = 'Oops, a server error occurred';

    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  static shouldSendServerError() {
    return Math.random() > 0.9;
  }

  static hasId(id, data) {
    return !!data.find(data => data.id === id);
  }

  getData(req, res) {
    if (ApiService.shouldSendServerError()) {
      res.status(500).send(this.serverErrorMessage);
      return;
    }

    res.status(200).send(this.data);
  }

  postData(req, res) {
    if (ApiService.shouldSendServerError()) {
      res.status(500).send(this.serverErrorMessage);
      return;
    }

    const { body } = req;
    if (!body || !body.id || !body.name || !body.description) {
      res.status(400).send(this.missingDataMessage);
      return;
    } else if (ApiService.hasId(body.id, this.data)) {
      res.status(400).send(this.duplicateIdMessage);
      return;
    }

    this.data.push(body);
    res.status(200).end();
  }

  deleteData(req, res) {
    if (ApiService.shouldSendServerError()) {
      res.status(500).send(this.serverErrorMessage);
      return;
    }

    const { body } = req;
    if (!body || !body.id) {
      res.status(400).send(this.missingEventIdMessage);
      return;
    } else if (!ApiService.hasId(body.id, this.data)) {
      res.status(400).send(this.idDoesNotExistMessage);
      return;
    }

    this.data = this.data.filter(data => data.id !== body.id);
    res.status(200).end();
  }
}

module.exports = ApiService;
