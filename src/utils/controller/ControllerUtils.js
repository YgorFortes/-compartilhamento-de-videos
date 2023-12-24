import { Router } from 'express';

export class ControllerUtils {
  constructor () {
    this.router = Router();
    this.setupRouter();
  }

  setupRouter () {}

  routes () {
    return this.router;
  }
}