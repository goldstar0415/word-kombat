import {Component} from "@nestjs/common";
import {Rank} from "../../entity/rank.entity";
import {DefaultScope} from "sequelize-typescript";
import {User} from "../../entity/user.entity";

@DefaultScope({
    include: [() => Rank]
})
@Component()
export class UserRepository {

    async findById(id: number): Promise<User> {
        return User.findById(id);
    }

    async findByEmail(email: string): Promise<User> {
        return User.findOne({where: {email}});
    }

    async findByName(name: string): Promise<User> {
        return User.findOne({where: {name}});
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
            rank_id: 1
        });
    }

    async update(id: number, newUser: User): Promise<User> {

        const ranks = await Rank.findAll({order: ['min_score', 'DESC']});

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
