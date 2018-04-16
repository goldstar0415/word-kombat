import {Component} from "@nestjs/common";
import {Word} from "../../entity/word.entity";

@Component()
export class WordRepository {

    async add(word: Word): Promise<Word> {
        return Word.create(word);
    }

    async findById(id: number): Promise<Word> {
        return Word.findById(id);
    }

    async getRandomWords(amount: number): Promise<Word[]> {
        return Word.findAll({
            order: "RANDOM()",
            limit: amount
        });
    }

    async delete(id: number): Promise<void> {
        return Word.findById(id).then(word => word.destroy());
    }
}
