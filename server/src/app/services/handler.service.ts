import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Model } from "mongoose";

export const getAll = (model: Model<any>) => {
  return catchAsync(
    async (_req: Request, res: Response, next: NextFunction) => {
      const data = await model.find();
      res.status(200).json({
        data,
      });
    }
  );
};

export const getById = (model: Model<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await model.findById(req.params.id);
    res.status(200).json({
      data,
    });
  });
};

export const create = (model: Model<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const data = await model.create(req.body);
    res.status(201).json({
      data,
    });
  });
};
