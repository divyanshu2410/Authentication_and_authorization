import ITokenStore from '../../services/ITokenStore'
import NodeCache from 'node-cache';

export default class RedisTokenStore implements ITokenStore {
  constructor(private readonly client: NodeCache) {}
  save(token: string): void {
    this.client.set(token, token)
  }
  async get(token: string): Promise<string> {
    const storedToken = this.client.get<string>(token);
    if (storedToken) {
      return storedToken;
    } else {
      return '';
    }
  }   
}