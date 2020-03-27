import { RESTDataSource } from 'apollo-datasource-rest';

export default class RandomUser extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://randomuser.me/api';
  }

  async getUser(gender = 'all') {
    const user = await this.get(`/?gender=${gender}`);
    return user.results[0];
  }

  async getUsers(people = 10, gender = 'all') {
    const user = await this.get(`/?results=${people}&gender=${gender}`);
    return user.results;
  }
}
