import express from 'express';

class NestFactoryStatic {
  create(module: any): any {
    return express();
  }
}