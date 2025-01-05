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

export const createOne = (model: Model<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    // check for builk request
    if (Array.isArray(req.body) && req.params.bulk) {
      const data = await model.insertMany(req.body);
      return res.status(201).json({
        data,
      });
    }
    const data = await model.create(req.body);
    res.status(201).json({
      data,
    });
  });
};

export const updateOne = (model: Model<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await model.findByIdAndUpdate(req.params, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      data,
    });
  });
};

export const deleteOne = (model: Model<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await model.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
