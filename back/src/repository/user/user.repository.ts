import { Component } from '@nestjs/common';
import { Rank } from '../../entity/rank.entity';
import { DefaultScope } from 'sequelize-typescript';
import { User } from '../../entity/user.entity';
import * as Seq from 'sequelize';

@DefaultScope({
  include: [() => Rank],
})
@Component()
export class UserRepository {
  async findById(id: number): Promise<User> {
    return User.findById(id, {
      include: [
        {
          model: Rank,
        },
      ],
    });
  }

  async findByEmailOrName(email: string, name: string): Promise<User> {
    return User.findOne({
      where: {
        [Seq.Op.or]: [{ email }, { name }],
      },
      include: [
        {
          model: Rank,
        },
      ],
    });
  }

  async findAll(params = {}): Promise<User[]> {
    return User.findAll(params);
  }

  async add(user: User): Promise<User> {
    return User.create({
      email: user.email,
      name: user.name,
      password: user.password,
      icon: user.icon,
      score: user.score,
    });
  }

  async update(id: number, newUser: Partial<User>): Promise<User> {
    const ranks = await Rank.findAll({ order: [['minScore', 'DESC']] });

    for (let i in ranks) {
      if (newUser.score >= ranks[i].minScore) {
        newUser.rankId = ranks[i].id as any;
        break;
      }
    }

    try {
      return newUser.save();
    } catch (error) {
      const user = await User.findById(id);
      return user.update(newUser);
    }
  }

  async delete(id: number): Promise<void> {
    return User.findById(id).then(user => user.destroy());
  }
}
