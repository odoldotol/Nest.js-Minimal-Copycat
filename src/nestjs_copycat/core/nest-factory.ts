const express = require('express')

class NestFactoryStatic {
  create(module: any): any {
    return express();
  }
}

export const NestFactory = new NestFactoryStatic();