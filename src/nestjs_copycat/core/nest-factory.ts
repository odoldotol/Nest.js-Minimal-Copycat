const express = require('express')
import { Express } from "express";
import { NestContainer } from './injector';

export class NestFactoryStatic {

  public async create(
    moduleCls: any,
  ) {
    const app = express();
    app.use(express.json());
    return app;

    const container = new NestContainer();
  }

}

export const NestFactory = new NestFactoryStatic();