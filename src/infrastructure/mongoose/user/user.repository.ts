import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { IUserRepository } from '../../../domain/user/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class MongooseUserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async countDocuments(filter: any = {}): Promise<number> {
    return this.userModel.countDocuments(filter).exec();
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async create(data: any): Promise<any> {
    const doc = new this.userModel(data);
    return doc.save();
  }

  async findById(id: string): Promise<any | null> {
    return this.userModel.findById(id).exec();
  }

  async find(filter: any = {}, projection: any = {}): Promise<any[]> {
    return this.userModel.find(filter, projection).exec();
  }

  async updateById(
    id: string,
    update: any,
    opts: any = { new: true },
  ): Promise<any | null> {
    return this.userModel.findByIdAndUpdate(id, update, opts).exec();
  }
}
